import React, { useState, useEffect } from 'react'
//import { useHistory } from 'react-router-dom'
// import { primaryBadge, infoBadge } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'
import {
  CBadge,
  // CAlert,
  CCard,
  // CSpinner,
  // CModal,
  // CForm,
  // CFormGroup,
  // CModalTitle,
  // //CFormText,
  // CValidFeedback,
  // CInvalidFeedback,
  // //CTextarea,
  // CInput,
  // //CInputFile,
  // //CInputCheckbox,
  // //CInputRadio,
  // //CInputGroup,
  // //CInputGroupAppend,
  // //CInputGroupPrepend,
  // //CDropdown,
  // //CInputGroupText,
  // CLabel,
  // //CSelect,
  // CModalHeader,
  // CModalBody,
  // CModalFooter,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  // CButton,
  CPagination,
  // CTabs,
  // CNav,
  // CNavLink,
  // CNavItem,
  // CTabContent,
  // CTabPane
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import PostsData from './PostsData'

//import CIcon from '@coreui/icons-react'

const Users = ({ match }) => {

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  // const [FormData, setFormData] = useState({});
  // const [FormDataView, setFormDataView] = useState({});
  //  const [loading, setLoading] = useState(true)
  const [userlist, setuserlist] = useState(PostsData.usersData)

  
  // const [modalDataView, setModalDataView] = useState(false);

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


  // const detailPage = (data) => {
  //   setFormDataView({
  //     username: data.username,
  //     name: data.name,
  //     password: data.password,
  //     id: data.id
  //   });
  //   toggleDataView()
  // }


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

  useEffect(() => {
    MyfetchData();

  }, []);
  async function pageChange(newPage) {
    setLoading(true)
    console.log(newPage)
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

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
           Blog
            {/* <small className="text-muted"> List Post</small> 
            {/* <CButton size="sm" color="success" onClick={SavePage} ><svg width="14" height="22" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
            </svg> Add New</CButton> */}
          </CCardHeader>
          <CCardBody >

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
                    activePage={page}
                    itemsPerPage={5}
                    //clickableRows
                    loading={loading}
                    scopedSlots={{
                      'index':
                        (item, index) => (
                          <td>
                            <CBadge color="info">
                              {index + 1}
                            </CBadge>
                          </td>
                        )
                    }}

                  />
                  <CPagination
                    activePage={page}
                    onActivePageChange={pageChange}
                    itemsperpage={5}
                    doubleArrows={true}
                    align="center"
                  />
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
