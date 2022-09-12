import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
import { primaryBadge, infoBadge } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'
import {
  CBadge,
  CAlert,
  CCard,
  // CSpinner,
  CModal,
  CForm,
  CFormGroup,
  CModalTitle,
  //CFormText,
  CValidFeedback,
  CInvalidFeedback,
  //CTextarea,
  CInput,
  //CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
  //CInputGroupText,
  CLabel,
  //CSelect,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination,
  CTabs,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import PostsData from './PostsData'

//import CIcon from '@coreui/icons-react'

const Users = ({ match }) => {
  //const history = useHistory()
  const [modalDelConf, setModalDelConf] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [page, setPage] = useState(1)
  const [pageDraft, setPageDraft] = useState(1)
  const [pageThrash, setPageThrash] = useState(1)
  const [loading, setLoading] = useState(true)
  const [FormData, setFormData] = useState({});
  const [FormDataView, setFormDataView] = useState({});
  //  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(PostsData.usersData)

  const [userlistDraft, setuserlistDraft] = useState(PostsData.usersData)

  const [userlistThrash, setuserlistThrash] = useState(PostsData.usersData)

  const [modalDataView, setModalDataView] = useState(false);

  const [countPublished, setcountPublished] = useState(0);
  const [countDraft, setcountDraft] = useState(0);
  const [countThrash, setcountThrash] = useState(0);

  // const SavePage = (data) => {
  //   //dataRedux = 555;  
  //   //articles.dispatch({ type: 'ADD_POST', payload: { id: 1, title: 'How to Use Redux' } })

  //   store.dispatch({ type: 'CHANGE_STATE', payload: { modulState: "Save Data", HeadModal: "Save Form User", ShowHideAl: "d-none" } })
  //   //setmodalHeader("Save Form Contact")  
  //   //setSubmitBtn("Save Data")
  //   setFormData({
  //   });
  //   toggleData()
  //   //setShowHideAl('d-none')
  //   //history.push(`/contactmanagement/listcontact?page=2`)
  // }

  const toggleData = () => {
    store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner: " " } })
    setModalData(!modalData);
    //console.log(store.getState())
  }


  // const detailPage = (data) => {
  //   setFormDataView({
  //     username: data.username,
  //     name: data.name,
  //     password: data.password,
  //     id: data.id
  //   });
  //   toggleDataView()
  // }

  async function DraftPublish(e) {
    console.log(FormData)
    e.preventDefault();
    let id = FormData.Id
    // let formData = arrayRemove(FormData, "id");
    await fetch("https://apisharing.herokuapp.com/articleUpdate/" + id, {
      method: "put",
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify(FormData)
    }).then(res => res.json())
      .then(
        (result) => {
          if (result) {
            MyfetchData();
            MyfetchDataDraft();
            toggleData();
          }
        });
  }

  const toggleDataView = () => {
    setModalDataView(!modalDataView);
  }

  const onFieldChange = (fieldName) => {
    //console.log(fieldName);
    return function (event) {
      setFormData({
        Id: FormData.Id,
        Category: FormData.Category,
        Title: FormData.Title,
        [fieldName]: event.target.value
      });
    }
  }

  const changeEditPage = (data) => {
    store.dispatch({ type: 'CHANGE_STATE', payload: { modulState: "Edit Data", HeadModal: "Edit Form User", ShowHideAl: "d-none" } })
    //setSubmitBtn("Edit Data")
    setFormData({
      Id: data.Id,
      Title: data.Title,
      Category: data.Category
    });
    //setShowHideAl('d-none')
    toggleData()
  }

  async function MyfetchData() {
    setLoading(true)
    await fetch("https://apisharing.herokuapp.com/article/5/0/publish"
    ).then(res => res.json())
      .then(
        (result) => {
          console.log(result)

          let Datalist = []
          let j = 0
          if (result) {
            for (var i = 0; i < 5; i++) {
              if (result[j])
                Datalist[i] = result[j]
              j++
            }
          }
          setuserlist(Datalist)
          //console.log(Datalist)
          setLoading(false)
          // countData()
          //return
        });

  }

  async function countData() {
    setLoading(true)
    setPage(1)
    await fetch("https://apisharing.herokuapp.com/CountArticle/"
    ).then(res => res.json())
      .then(
        (result) => {
          if (result) {
            let cek;
            for (let i = 0; i < result.length; i++) {
              if (result[i]) {
                cek = result[i].split(":")
                if (cek[0] === "draft")
                  setcountDraft(cek[1])
                else if (cek[0] === "publish")
                  setcountPublished(cek[1])
                else {
                  setcountThrash(cek[1])
                }

              }
            }
            console.log(result[0])
          }

          setLoading(false)
          //return
        });

  }

  async function MyfetchDataDraft() {
    setLoading(true)
    setPageDraft(1)
    await fetch("https://apisharing.herokuapp.com/article/5/0/draft"
    ).then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          let Datalist = []
          let j = 0
          if (result) {
            for (var i = 0; i < 5; i++) {
              if (result[j])
                Datalist[i] = result[j]
              j++
            }
          }
          setuserlistDraft(Datalist)
          //console.log(Datalist)
          setLoading(false)
          countData()
          //return
        });

  }

  async function MyfetchDataThrash() {
    setLoading(true)
    setPageThrash(1)
    await fetch("https://apisharing.herokuapp.com/article/5/0/thrash"
    ).then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          let Datalist = []
          let j = 0
          if (result) {
            for (var i = 0; i < 5; i++) {
              if (result[j])
                Datalist[i] = result[j]
              j++
            }
          }
          setuserlistThrash(Datalist)
          //console.log(Datalist)
          setLoading(false)
          countData()
          //return
        });

  }

  async function MoveToThrash(e) {
    e.preventDefault();
    setLoading(true)
    console.log(FormDataView)
    e.preventDefault();
    await fetch("https://apisharing.herokuapp.com/articleToTrash/" + FormDataView.id,
      {
        method: "put"
      }
    ).then(res => res.json())
      .then(
        (result) => {
          if (result) {
            toggleDelConf()
            MyfetchData()
            MyfetchDataDraft()
            MyfetchDataThrash()
          }
          e.preventDefault();
        });
    e.preventDefault();

  }

  const toggleDelConf = () => {
    setModalDelConf(!modalDelConf);
  }

  useEffect(() => {
    MyfetchData();
    countData();

  }, []);
  async function pageChange(newPage) {
    setPage(newPage)
    await fetch("https://apisharing.herokuapp.com/article/5/"+(5 * (parseInt(newPage) - 1))+"/publish")
      .then(res => res.json())
      .then(
        (result) => {
          let numb = 5 * (parseInt(newPage) - 1)
          let Datalist = []
          if (result) {
            let j = 0
            for (var i = numb; i < (numb + 5); i++) {
              if (result[j])
                Datalist[i] = result[j]
              j++
            }
          }
          //console.log(Datalist)
          setuserlist(Datalist)
          
          setLoading(false)
        });
  }

  async function pageChangeDraft(newPage) {
    setPageDraft(newPage)
    await fetch("https://apisharing.herokuapp.com/article/5/"+(5 * (parseInt(newPage) - 1))+"/draft")
      .then(res => res.json())
      .then(
        (result) => {
          let numb = 5 * (parseInt(newPage) - 1)
          let Datalist = []
          if (result) {
            let j = 0
            for (var i = numb; i < (numb + 5); i++) {
              if (result[j])
                Datalist[i] = result[j]
              j++
            }
          }
          //console.log(Datalist)
          setuserlistDraft(Datalist)
          setLoading(false)
        });
  }

  async function pageChangeThrash(newPage) {
    setPageThrash(newPage)
    await fetch("https://apisharing.herokuapp.com/article/5/"+(5 * (parseInt(newPage) - 1))+"/thrash")
      .then(res => res.json())
      .then(
        (result) => {
          let numb = 5 * (parseInt(newPage) - 1)
          let Datalist = []
          if (result) {
            let j = 0
            for (var i = numb; i < (numb + 5); i++) {
              if (result[j])
                Datalist[i] = result[j]
              j++
            }
          }
          //console.log(Datalist)
          setuserlistThrash(Datalist)
          setLoading(false)
        });
  }

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
           List Post
            {/* <small className="text-muted"> List Post</small> 
            {/* <CButton size="sm" color="success" onClick={SavePage} ><svg width="14" height="22" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
            </svg> Add New</CButton> */}
          </CCardHeader>
          <CCardBody >
            <CModal
              show={modalDelConf}
              onClose={toggleDelConf}
            >
              <CModalHeader>
                <CModalTitle>Confirmation</CModalTitle>
              </CModalHeader>
              <CModalBody>
                You are about to move this item to thrash
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={toggleDelConf}>
                  Cancel
                </CButton>
                <CButton color="danger" onClick={(e) => MoveToThrash(e)}>Proceed</CButton>
              </CModalFooter>
            </CModal>
            <CModal

              show={modalDataView}
              onClose={toggleDataView}
            >
              <CModalHeader closeButton className="text-primary d-flex justify-content-end">{FormDataView.username}</CModalHeader>
              <CModalBody>
                <div className="row g-5 d-flex justify-content-center" >
                  <div className="col">
                    <CLabel className="form-label text-info" color="secondary">Username</CLabel>
                    <label className="form-control mb-4">{FormDataView.username}</label>
                    <label className="form-label text-info">Name</label>
                    <label className="form-control mb-4">{FormDataView.name}</label>
                    <label className="form-label text-info">Password</label>
                    <label className="form-control">{FormDataView.password}</label>
                  </div>
                </div>
              </CModalBody>
              <CModalFooter>
                {' '}
                <CButton
                  color="secondary"
                  onClick={toggleDataView}
                >Close</CButton>
              </CModalFooter>
            </CModal>

            <CTabs activeTab="published">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="published" onClick={() => MyfetchData()}>
                    Published {countPublished}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="draft" onClick={() => MyfetchDataDraft()}>
                    Draft {countDraft}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="trashed" onClick={() => MyfetchDataThrash()}>
                    Trashed {countThrash}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="published">
                  <CDataTable
                    items={userlist}
                    fields={PostsData.fields}
                    tableProps={{

                      hover: true
                    }}
                    hover
                    striped
                    style={{
                      tableLayout: 'fixed'
                    }}
                    //clickableRows
                    loading={loading}
                    //onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
                    scopedSlots={{
                      'button_td':
                        (item) => (
                          <td>
                            {/* <CButton
                              onClick={() => detailPage(item)}
                              type="submit" size="sm" color="info"><svg width="14" height="22" fill="currentColor" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" viewBox="0 0 512 512" className="svg-inline--fa fa-external-link-alt fa-w-16 fa-5x"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" className=""></path></svg> Detail</CButton> */}
                            <CButton
                              onClick={() => changeEditPage(item)}
                              type="submit" className="w-10 mr-2 d-inline-block" size="sm" color="success"><CIcon name="cil-pencil" /></CButton>
                            <CButton
                              onClick={() => {
                                setFormDataView({
                                  id: item.Id
                                });
                                toggleDelConf()
                              }}
                              type="submit" className="w-10 d-inline-block" size="sm" color="danger"><CIcon name="cil-trash" /></CButton>
                          </td>
                        ),
                      'index':
                        (item, index) => (
                          <td>
                            <CBadge color="info">
                              {index + 1}
                            </CBadge>
                          </td>
                        ),
                      // 'Content':
                      //   (item) => (
                      //     <td style={{width: '30px'
                      //       }}>
                      //       {primaryBadge(item.Content)}
                      //     </td>
                      //   ),
                      'Status':
                        (item) => (
                          <td>
                            {infoBadge(item.Status)}
                          </td>
                        ),
                      'id':
                        (item) => (
                          <td>
                            {primaryBadge(item.Id)}
                          </td>
                        )
                    }}
                  />
                  <CPagination
                    activePage={page}
                    onActivePageChange={pageChange}
                    itemsPerPage={5}
                    doubleArrows={true}
                    align="center"
                  />
                </CTabPane>
                <CTabPane data-tab="draft">
                  <CDataTable
                    id="mmm"
                    name="mmm"
                    items={userlistDraft}
                    fields={PostsData.fields}
                    tableProps={{

                      hover: true
                    }}
                    hover
                    striped
                    style={{
                      tableLayout: 'fixed'
                    }}
                    activePage={pageDraft}
                    itemsPerPage={5}
                    //clickableRows
                    loading={loading}
                    //onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
                    scopedSlots={{
                      'button_td':
                        (item) => (
                          <td>
                            {/* <CButton
                              onClick={() => detailPage(item)}
                              type="submit" size="sm" color="info"><svg width="14" height="22" fill="currentColor" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" viewBox="0 0 512 512" className="svg-inline--fa fa-external-link-alt fa-w-16 fa-5x"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" className=""></path></svg> Detail</CButton> */}
                            <CButton
                              onClick={() => changeEditPage(item)}
                              type="submit" className="w-10 mr-2 d-inline-block" size="sm" color="success"><CIcon name="cil-pencil" /></CButton>
                            <CButton
                              onClick={() => {
                                setFormDataView({
                                  id: item.Id
                                });
                                toggleDelConf()
                              }}
                              type="submit" className="w-10 d-inline-block" size="sm" color="danger"><CIcon name="cil-trash" /></CButton>
                          </td>
                        ),
                      'index':
                        (item, index) => (
                          <td>
                            <CBadge color="info">
                              {index + 1}
                            </CBadge>
                          </td>
                        ),
                      // 'Content':
                      //   (item) => (
                      //     <td style={{width: '30px'
                      //       }}>
                      //       {primaryBadge(item.Content)}
                      //     </td>
                      //   ),
                      'Status':
                        (item) => (
                          <td>
                            {infoBadge(item.Status)}
                          </td>
                        ),
                      'id':
                        (item) => (
                          <td>
                            {primaryBadge(item.Id)}
                          </td>
                        )
                    }}
                  />
                  <CPagination
                    activePage={pageDraft}
                    onActivePageChange={pageChangeDraft}
                    itemsPerPage={5}
                    doubleArrows={true}
                    align="center"
                  />
                </CTabPane>
                <CTabPane data-tab="trashed">
                  <CDataTable
                    items={userlistThrash}
                    fields={PostsData.fields}
                    tableProps={{

                      hover: true
                    }}
                    hover
                    striped
                    style={{
                      tableLayout: 'fixed'
                    }}
                    //clickableRows
                    loading={loading}
                    //onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
                    scopedSlots={{
                      'button_td':
                        (item) => (
                          <td>
                            {/* <CButton
                              onClick={() => detailPage(item)}
                              type="submit" size="sm" color="info"><svg width="14" height="22" fill="currentColor" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" viewBox="0 0 512 512" className="svg-inline--fa fa-external-link-alt fa-w-16 fa-5x"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" className=""></path></svg> Detail</CButton> */}
                            <CButton
                              onClick={() => changeEditPage(item)}
                              type="submit" className="w-10 d-inline-block" size="sm" color="success"><CIcon name="cil-pencil" /></CButton>
                                                      {/* <CButton
                              onClick={() => {
                                toggleDelConf()
                              }}
                              type="submit" size="sm" color="danger"><CIcon name="cil-trash" /> Delete</CButton> */}
                          </td>
                        ),
                      'index':
                        (item, index) => (
                          <td>
                            <CBadge color="info">
                              {index + 1}
                            </CBadge>
                          </td>
                        ),
                      // 'Content':
                      //   (item) => (
                      //     <td style={{width: '30px'
                      //       }}>
                      //       {primaryBadge(item.Content)}
                      //     </td>
                      //   ),
                      'Status':
                        (item) => (
                          <td>
                            {infoBadge(item.Status)}
                          </td>
                        ),
                      'id':
                        (item) => (
                          <td>
                            {primaryBadge(item.Id)}
                          </td>
                        )
                    }}
                  />
                  <CPagination
                    activePage={pageThrash}
                    onActivePageChange={pageChangeThrash}
                    itemsPerPage={5}
                    doubleArrows={true}
                    align="center"
                  />
                </CTabPane>
              </CTabContent>
            </CTabs>

            <CModal
              show={modalData}
              onClose={toggleData}
            >
              <CModalHeader closeButton>Edit Form Post</CModalHeader>
              <CModalBody>
                <CAlert color="success" className={store.getState().ShowHideAl}>{store.getState().AlertMsg}</CAlert>
                <CForm
                  onSubmit={(e) => DraftPublish(e)}
                  className="was-validated">
                  <CFormGroup>
                    <CLabel htmlFor="Title">Title</CLabel>
                    <CInput type="hidden" id="id" name="id" value={FormData.Id || ""} />
                    <CInput type="text" id="Title" value={FormData.Title || ""} onChange={onFieldChange('Title').bind(this)} name="Title" minLength="20" maxLength="100" placeholder="Enter Title..." required />
                    <CValidFeedback>Good!!</CValidFeedback>
                    <CInvalidFeedback className="help-block">
                      Please Provide At least 20 characters
                    </CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="Category">Category</CLabel>
                    <CInput type="text" id="Category" name="Category" value={FormData.Category || ""} minLength="3" maxLength="100" onChange={onFieldChange('Category').bind(this)} placeholder="Enter Category..." required />
                    <CValidFeedback>Good!!</CValidFeedback>
                    <CInvalidFeedback className="help-block">
                      Please Provide At least 3 characters
                    </CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup>
                    <CButton value="publish" name="status" id="status"
                      onClick={onFieldChange('status').bind(this)}
                      type="submit" size="sm" className="ml-3" color="primary">
                      <CIcon name="cil-check" /> Publish</CButton>
                    <CButton value="draft" name="status" id="status"
                      onClick={onFieldChange('status').bind(this)}
                      type="submit" size="sm" className="ml-3" color="primary">
                      <CIcon name="cil-check" /> Draft</CButton>
                    {store.getState().Spinner}


                  </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter>
                {' '}
                <CButton
                  color="secondary"
                  onClick={toggleData}
                >Cancel</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = (state, action) => {
  console.log(state)
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps, { store: store })(Users)
