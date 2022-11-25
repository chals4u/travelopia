import User from "assets/images/user.jpg";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NormalButton, NormalInput, NormalTextArea } from 'components/common';
import { actions } from "redux/Question/action";
import { BottomMenu } from "components/BottomMenu";
import loaderAction from 'redux/Loader/action';
import { NormalCard } from "components/common/card";
import { PlainCard } from "components/common/plainCard";
import submitIcon from 'assets/images/submit.svg';
import queryString from 'query-string'
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import ReactPaginate from 'react-paginate';
import loadingimg from '../../assets/images/loading.gif'
import { Circular } from 'components/Loader/circular';
import Multiselect from 'multiselect-react-dropdown';
import { Spinner } from 'components/Loader';
import $ from 'jquery';
export const Answer = (props) => {
    const [pageNumber, setPageNumber] = useState(0);
    const categoryPerPage = 10;
    const pagesVisited = pageNumber * categoryPerPage;
    var synonymArr = [];
    const { networkProgressDialog: open } = useSelector((state) => state.loader);
    const [active, setActive] = useState('');
    const [acceptColor, setAcceptColor] = useState('#25282B');
    const [acceptsymptomColor, setAcceptSymptomColor] = useState('#fff');
    const [qtnId, setqtnId] = useState('');
    const [catId, setCatId] = useState('');
    const [olddefn, setOldDefn] = useState('');
    const [oldsymptom, setOldSymptom] = useState([]);
    const [newsymptom, setNewSymptom] = useState([]);
    const [customdefn, setCustomDefn] = useState('');
    const [customsymptom, setCustomSymptom] = useState('');
    const [questionList, setQuestionList] = useState([]);

    const [answer, setAnswer] = useState('');
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { user: userData } = useSelector((state) => state.user);
    const { id } = useParams()
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [popupdata, setPopupData] = useState([]);
    const getData = async () => {
        const res = await axios.get(`https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/get-answers`)
        const data = res.data.result;
        
        setData(res.data.result)

    }
    let i = 1;
    const answers = data
    .slice(pagesVisited, pagesVisited + categoryPerPage)
    .map((pd) => {
      return (
        <tr>
            <td>{i++}</td>
            {/* <td>John</td> */}
            <td>{pd.question}</td>
            <td>{pd.definition ? pd.definition : '-'}</td>
            <td>Symptons1 , ...</td>
            <td>
                <div class="d-flex justify-content-end track-list-action" onClick={() => handleData(pd)} title="Approve">
                    <button type="button" class="modal-icon-btn ml-10 edit"
                        data-bs-toggle="modal"
                        data-bs-target="#PatientHealthTrackerEdit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14"
                            height="15" viewBox="0 0 14 15" fill="none">
                            <g clip-path="url(#clip0_282_606)">
                                <path
                                    d="M10.6814 2.14967L12.3509 3.81858L3.58167 12.5872L1.49158 13.0084L1.91333 10.9177L10.6814 2.14967ZM10.6814 0.5L0.838833 10.342L0 14.4994L4.15742 13.6612L14.0006 3.81858L10.6814 0.5V0.5Z"
                                    fill="#3D558B"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_282_606">
                                    <rect width="14" height="14" fill="white"
                                        transform="translate(0 0.5)"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>


                    <a href="#" class="d-flex align-center ml-10 delete" title="Remove">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14"
                            height="15" viewBox="0 0 14 15" fill="none">
                            <g clip-path="url(#clip0_282_608)">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.0832 14.5H2.9165C2.2725 14.5 1.74984 13.9773 1.74984 13.3333V3.41667H1.1665V2.25H4.6665V1.375C4.6665 0.892583 5.05909 0.5 5.5415 0.5H8.45817C8.93942 0.5 9.33317 0.891417 9.33317 1.375V2.25H12.8332V3.41667H12.2498V13.3333C12.2498 13.9773 11.7272 14.5 11.0832 14.5ZM11.0832 3.41667H2.9165V13.0417C2.9165 13.2027 3.04717 13.3333 3.20817 13.3333H10.7915C10.9525 13.3333 11.0832 13.2027 11.0832 13.0417V3.41667ZM5.83317 5.75C5.83317 5.428 5.57184 5.16667 5.24984 5.16667C4.92784 5.16667 4.6665 5.428 4.6665 5.75V11C4.6665 11.322 4.92784 11.5833 5.24984 11.5833C5.57184 11.5833 5.83317 11.322 5.83317 11V5.75ZM9.33317 5.75C9.33317 5.428 9.07184 5.16667 8.74984 5.16667C8.42784 5.16667 8.1665 5.428 8.1665 5.75V11C8.1665 11.322 8.42784 11.5833 8.74984 11.5833C9.07184 11.5833 9.33317 11.322 9.33317 11V5.75ZM8.1665 1.66667H5.83317V2.25H8.1665V1.66667Z"
                                    fill="#3D558B" />
                            </g>
                            <defs>
                                <clipPath id="clip0_282_608">
                                    <rect width="14" height="14" fill="white"
                                        transform="translate(0 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            </td>
        </tr>
      );
    });
  const pageCount = Math.ceil(data.length / categoryPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
    const loadPopup = async (id) => {
        dispatch(loaderAction.startLoader());
        const res = await axios.get(`https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/get-answers/${id}`)
        const data = res.data.result;
        data.map(pd => {
            pd.Answer.map(answer => {
                synonymArr.push(answer.symptom)

            })
            setNewSymptom(synonymArr)
            handlePopupData(pd, synonymArr)
        }
        )

    }
    const handlePopupData = (p, synonymArr) => {
        setOldDefn(p.question[0].definition)
        setOldSymptom(p.question)
        setAnswer(p.Answer[0].id)
        if ($('#newdefn').length > 0)
            setCustomDefn(p.Answer[0].defn)
        setCustomSymptom(p.Answer[0].symptom)

    }
    useEffect(() => {
        getData()
    }, [offset])
    const onAnswerSubmit = () => {
        
        const detail = {
            definition: customdefn,
            synonyms: newsymptom,
            question_id: qtnId,
            category_id: catId,
            user_id: userData.id,
            answers_id: answer,


        };
        dispatch(actions.approveAnswer(detail));
        
    };
    const handleData = (p) => {
        console.log("jjj =>",p)
        setqtnId(p.id)
        setCatId(p.categories_id)
        setActive(p.question)
        loadPopup(p.id)
    }
    const acceptDefn = () => {
        setAcceptColor("#0eeb3a")

    }
    const acceptsymptom = (id) => {
        var element = document.getElementById(id);
        $('#path' + id).css({ fill: "#0eeb3a" });
    }
    const rejectDefn = (id) => {
        var element = document.getElementById(id);
        element.parentNode.removeChild(element);
        setCustomDefn('')
    }
    const rejectSymptom = (item) => {
        var array = newsymptom;
        var index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            setNewSymptom(array)
        }
    }
    const handleClose = () => {
        window.location.reload();

    };
    return (
        <>
            <div class="pb-30 content-panel">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="pt-30">
                                <div class="table-responsive">
                                    <table class="mb-0 table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th scope="col">S.No</th>
                                                {/* <th scope="col">Name</th> */}
                                                <th scope="col">Title</th>
                                                <th scope="col">Definition</th>
                                                <th scope="col">Symptoms</th>
                                                <th scope="col" class="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {answers.length <= 0
                                                ? <Spinner />
                                                : answers}
                                                
                                        </tbody>
                                    </table>
                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />    
            {/* <!-- Vertically centered scrollable modal --> */}
            <div class="modal fade" id="PatientHealthTrackerEdit"
                tabindex="-1" aria-labelledby="PatientHealthTrackerEdit"
                aria-hidden="true">
                <div
                    class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">

                            {active
                                ? <h5 class="m-0 lato-bold-16px modal-title"
                                    id="PatientHealthTrackerEdit">{active}</h5>
                                : ""


                            }
                            <button type="button" class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="edit-definition">
                                <div class="mb-15 definition old">
                                    <h5 class="fw-700">Old Definition</h5>
                                    <p class="line-height-24">
                                        {olddefn.length <= 0
                                            ? <img src={loadingimg} style={{
                                                height: "70px", width: "70px", position: "absolute",
                                                marginLeft: '30%',
                                                marginTop: '-4%', alignItems: 'center',
                                            }} />
                                            : olddefn
                                        }
                                    </p>

                                </div>
                                <div class="mb-15 relative definition new" id="newdefn">
                                    <div class="absolute actions">
                                        <div class="action">
                                            <a href="#" title="Accept" onClick={() => acceptDefn()}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="35" height="35"
                                                    viewBox="0 0 35 35"
                                                    fill="none">
                                                    <path
                                                        d="M0 0H35V27C35 31.4183 31.4183 35 27 35H8C3.58172 35 0 31.4183 0 27V0Z"
                                                        fill="#DCDCDC" />
                                                    <path
                                                        d="M14.375 27L5 17.9174L7.90729 14.8997L14.3198 21.076L27.0385 8L30 10.962L14.375 27Z"
                                                        fill={acceptColor} />
                                                </svg>
                                            </a>
                                        </div>
                                        <div class="action">
                                            <a href="#" onClick={() => rejectDefn($('#newdefn').attr('id'))} title="Reject">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="35" height="35"
                                                    viewBox="0 0 35 35"
                                                    fill="none">
                                                    <path
                                                        d="M0 0H35V27C35 31.4183 31.4183 35 27 35H8C3.58172 35 0 31.4183 0 27V0Z"
                                                        fill="#DCDCDC" />
                                                    <path
                                                        d="M25.9585 23.7056L19.4477 17.1933L25.9585 10.6912L23.7058 8.45837L17.1974 14.9644L10.6937 8.45837L8.4585 10.6936L14.9701 17.2131L8.4585 23.7231L10.6937 25.9584L17.2188 19.442L23.7257 25.9584L25.9585 23.7056Z"
                                                        fill="#25282B" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <h5 class="fw-700">New Definition</h5>
                                    <p class="line-height-24">
                                        {
                                            customdefn.length <= 0
                                                ? <img src={loadingimg} style={{
                                                    height: "70px", width: "70px", position: "absolute",
                                                    marginLeft: '30%',
                                                    marginTop: '-4%', alignItems: 'center',
                                                }} />
                                                : customdefn
                                        }

                                    </p>
                                </div>
                                <div class="mb-15 symptoms-listing old">
                                    <h5 class="fw-700">Old Symptoms</h5>
                                    <div class="symptoms-list">
                                        {
                                            oldsymptom && oldsymptom.map((sc) => {

                                                return (<div class="symptom" id={sc.id}>
                                                    <div class="text">
                                                        {sc.symptom}
                                                    </div>
                                                    {sc.symptom != undefined &&
                                                        <div class="actions">
                                                            <div class="action delete">
                                                                <a href="#" onClick={() => rejectSymptom(sc.id)} title="Reject">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 20 20"
                                                                        fill="none">
                                                                        <rect width="20"
                                                                            height="20"
                                                                            rx="10"
                                                                            fill="#25282B" />
                                                                        <path
                                                                            d="M14.8335 13.5461L11.113 9.82474L14.8335 6.10928L13.5462 4.83337L9.82713 8.5511L6.11077 4.83337L4.8335 6.11065L8.55441 9.8361L4.8335 13.5561L6.11077 14.8334L9.83941 11.1097L13.5576 14.8334L14.8335 13.5461Z"
                                                                            fill="white" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                            <div class="action accept">
                                                                <a href="#">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 20 20"
                                                                        fill="none">
                                                                        <rect width="20"
                                                                            height="20"
                                                                            rx="10"
                                                                            fill="#25282B" />
                                                                        <path
                                                                            d="M8.5 15L4 10.6977L5.3955 9.26829L8.4735 12.1939L14.5785 6L16 7.40304L8.5 15Z"
                                                                            fill="white" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div>
                                <div class="mb-15 symptoms-listing new">
                                    <h5 class="fw-700">New Symptoms</h5>
                                    <div class="symptoms-list">
                                        {newsymptom && newsymptom.map((sc, index) => {
                                            return (<div class="symptom">
                                                <div class="text">
                                                    {sc}
                                                </div>
                                                {sc != undefined &&
                                                    <div class="actions">
                                                        <div class="action delete">
                                                            <a href="#" onClick={() => rejectSymptom(sc)} title="Reject">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 20 20"
                                                                    fill="none">
                                                                    <rect width="20"
                                                                        height="20"
                                                                        rx="10"
                                                                        fill="#25282B" />
                                                                    <path
                                                                        d="M14.8335 13.5461L11.113 9.82474L14.8335 6.10928L13.5462 4.83337L9.82713 8.5511L6.11077 4.83337L4.8335 6.11065L8.55441 9.8361L4.8335 13.5561L6.11077 14.8334L9.83941 11.1097L13.5576 14.8334L14.8335 13.5461Z"
                                                                        fill="white" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                        <div class="action accept">
                                                            <a href="#" onClick={() => acceptsymptom(index).attr('id')} title="Accept">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 20 20"
                                                                    fill="none" >
                                                                    <rect width="20"
                                                                        height="20"
                                                                        rx="10"
                                                                        fill="#25282B" />
                                                                    <path id={"path" + index}
                                                                        d="M8.5 15L4 10.6977L5.3955 9.26829L8.4735 12.1939L14.5785 6L16 7.40304L8.5 15Z"
                                                                        fill={acceptsymptomColor} />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                }
                                            </div>)
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8"></div><div class="col-4" style={{ paddingBottom: "5px" }}><button class="btn btn-primary" type="submit" onClick={() => onAnswerSubmit()}>Approve & Continue</button></div>

                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Vertically centered scrollable modal end --> */}
        </>
    );
};
