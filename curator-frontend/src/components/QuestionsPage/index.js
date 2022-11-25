import User from "assets/images/user.jpg";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NormalButton, NormalInput, NormalTextArea } from 'components/common';
import { actions } from "redux/Question/action";
import { BottomMenu } from "components/BottomMenu";
import { NormalCard } from "components/common/card";
import { PlainCard } from "components/common/plainCard";
import submitIcon from 'assets/images/submit.svg';
import queryString from 'query-string'
import { Link } from "react-router-dom";
import axios from "axios";
import  "./style.css";
import ReactPaginate from 'react-paginate';
import { Spinner } from 'components/Loader';
export const QuestionsPage = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const categoryPerPage = 10;
  const pagesVisited = pageNumber * categoryPerPage;
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { user: userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams()
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [selectquestion, setSelectQuestion] = useState('');
  const [qtnId, setqtnId] = useState('');
  const [defn, serDefn] = useState('');
  const [customdefn, setCustomDefn] = useState('');
  const [customsymptom, setCustomSymoptom] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [answer, setAnswer] = useState('');
  const getData = async() => {
      const res = await axios.get(`https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/question/${id}`)
      setData(res.data.result)
  }
  const questions = data
    .slice(pagesVisited, pagesVisited + categoryPerPage)
    .map((pd) => {
      return (
        <div className="row">
                <div className="col-10">
                  <Link to="#" className="fw-700 link" title="click me to answer" data-bs-toggle="modal"
                    data-bs-target="#weightEdit" onClick={() => handleData(pd.id, pd.name, pd.definition)}>
                    {pd.id!=qtnId &&
                    <PlainCard
                    subTitle={pd.definition}
                    mainTitle={pd.question}
                    className="dashboard-categories-list"

                  />
                    }
                    
                  </Link>
                </div>
              </div>
      );
    });
  const pageCount = Math.ceil(data.length / categoryPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
useEffect(() => {
   getData()
 }, [])
  
  
 
  const onAnswerSubmit = (e) => {
    e.preventDefault();
   const detail = {
      defn: customdefn,
      symptom: customsymptom.split(","),
      question_id: qtnId,
      category_id:id,
      user_id: userData.id

    };
   
   dispatch(actions.createAnswer(detail));
  };
  const handleData = (id, qtn, defn) => {

    setqtnId(id)
    setSelectQuestion(qtn)
    serDefn(defn)
  }
  const handleClose = () => {
    window.location.reload();
    
  };
  return (
    <>
      <div class="pb-30 content-panel">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="content">
                <div class="dashboard">
                  <div
                    className="modal fade"
                    id="weightEdit"
                    tabIndex="-1"
                    aria-labelledby="special-condition"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div class="section-outer mt-30 questionnaire">
                            <form onSubmit={onAnswerSubmit}>
                              <div class="mt-30 answers-list">
                                <div class="row">
                                  <div class="col-12">
                                    <div class="row">
                                      <div class="col-11">
                                        <div class="radius-8 mb-30 lato-bold-22px question">
                                          {selectquestion && (
                                            <>{selectquestion}</>
                                          )

                                          }
                                        </div>
                                      </div>
                                      <div class="col-1">
                                        <button
                                          // ref={btnRef}
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                          onClick={handleClose}
                                        ></button>
                                      </div>
                                    </div>

                                  </div>
                                  <div class="col-12">
                                    <div
                                      class="radius-8 mb-20 section-outer-plain overview-card answer">
                                      <h2 class="m-0 pb-10 lato-bold-22px title">definition</h2>
                                      <p
                                        class="lato-normal-shark-13px line-height-24 mb-0 fw-500 text">
                                        {defn && (
                                          <>{defn}</>
                                        )

                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="answers-list none">
                                <div class="row">
                                  <div class="col-12">
                                    <div class="mb-15 form-group">
                                      <label class="form-label" id="">Please add your definitions</label>
                                      <div class="form-box">
                                        <textarea class="form-control page-form-control"
                                          id="exampleFormControlTextarea1" rows="3"
                                          placeholder="" value={customdefn}
                                          onChange={(e) => setCustomDefn(e.target.value)}
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="answers-list none">
                                <div class="row">
                                  <div class="col-12">
                                    <div class="mb-15 form-group">
                                      <label class="form-label" id="">Please add symptoms</label>
                                      <div class="form-box">
                                        <textarea class="form-control page-form-control"
                                          id="exampleFormControlTextarea1" rows="3"
                                          placeholder="" value={customsymptom}
                                          onChange={(e) => setCustomSymoptom(e.target.value)}></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="authentication-submit action-btn">
                                <button class="btn btn-primary" type="submit">Submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {data.length<=0
                  ?<Spinner />
                  :<><div class="dashboard-categories">
                  <div class="section-title">
                    <div className="row">
                      <div className="col-12">
                        <h2 class="mb-20 lato-bold-22px fw-700" style={{ paddingTop: "20px" }}>Questions</h2>
                      </div>

                    </div>


                  </div>
                  <div class="dashboard-categories-listing">
                    {questions}
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
                    
                  </div>
                </div></>

}
                </div>

                <BottomMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
