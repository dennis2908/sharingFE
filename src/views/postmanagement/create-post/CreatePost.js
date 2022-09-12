import React, { useState } from 'react'

// import { useHistory } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  //CCardFooter,
  CCardHeader,
  CCol,
  //CCollapse,
  //CDropdownItem,
  //CDropdownMenu,
  //CDropdownToggle,
  //CFade,
  CForm,
  CFormGroup,
  //CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
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
  CRow,
  //CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
//import { DocsLink } from 'src/reusable'

const CreateUser = () => {

  //const [collapsed, setCollapsed] = React.useState(true)
  //const [showElements, setShowElements] = React.useState(true)
  // const [name, setName] = useState("")
  // const [password, SetPassword] = useState("")
  // const [username, SetUsername] = useState("");
  const [PblshDraft, SetPblshDraft] = useState("");

  // const [formData, setFormData] = useState({
  //   Title : "",
  //   Content : "",
  //   Category : "",
  //   Status : ""
  // });
  // const history = useHistory()

  const ChangeForm = (e) => {
    // e.preventDefault();
    // console.log(e.target.value)
    // console.log(e.target.name)
    // if (e.target.name === "Title")
    //   setFormData({
    //     Title: e.target.value
    //   });
    // else if (e.target.name === "Content") {
    //   setFormData({
    //     Title: e.target.value
    //   });
    // }
    // else if (e.target.name === "Category") {
    //   setFormData({
    //     Title: e.target.value
    //   });
    // }

    // else {
    //   SetPassword(e.target.value)
    // }
    e.preventDefault();
  }

  const SubmitForm = async(e) => {
    e.preventDefault();
    let formData = {
      Title: e.target.Title.value,
      Content: e.target.Content.value,
      Category: e.target.Category.value,
      Status: PblshDraft
    }

    console.log(formData)
    await fetch("https://apisharing.herokuapp.com/article/", {
      method: "post",
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(
        (result) => {
          document.getElementById("formPost").reset();
        });



    e.preventDefault();
  }
  return (
    <>
      <CRow>
        <CCol xs="5" sm="5">
          <CCard>
            <CCardHeader>
              Create New Post
            </CCardHeader>
            <CCardBody>
              <CForm
              id="formPost"
                onChange={(e) => {
                  ChangeForm(e);
                }}
                onSubmit={(e) => {
                  SubmitForm(e);
                }}
                className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="Title">Title</CLabel>
                  <CInput type="text" id="Title" name="Title" minLength="20" maxLength="100" placeholder="Enter Title.." required />
                  <CValidFeedback>Good!!</CValidFeedback>
                  <CInvalidFeedback className="help-block">
                    Please Provide At least 20 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="Content">Content</CLabel>
                  <CTextarea
                    name="Content"
                    minLength="200"
                    maxLength="255"
                    id="Content"
                    rows="9"
                    placeholder="Enter Content.."
                  />
                  <CValidFeedback>Good!!</CValidFeedback>
                  <CInvalidFeedback className="help-block">
                    Please Provide At least 200 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Category</CLabel>
                  <CInput type="input" id="Category" name="Category" minLength="3" maxLength="100" placeholder="Enter Category.." required />
                  <CValidFeedback>Good!!</CValidFeedback>
                  <CInvalidFeedback className="help-block">
                    Please Provide At least 3 characters
                  </CInvalidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CButton
                    onClick={(e) => SetPblshDraft("publish")}
                    type="submit" size="sm" className="mr-2" color="primary"><CIcon name="cil-check" /> Publish</CButton>

                  <CButton
                    onClick={(e) => SetPblshDraft("draft")}
                    type="submit" size="sm" className="mr-2" color="primary"><CIcon name="cil-check" /> Draft</CButton>
                  <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CreateUser