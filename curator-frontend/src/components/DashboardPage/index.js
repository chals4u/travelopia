import User from "assets/images/user.jpg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "redux/Category/action";
import { BottomMenu } from "components/BottomMenu";
import { NormalCard } from "components/common/card";
import { PlainCard } from "components/common/plainCard";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import ReactPaginate from "react-paginate";
import { Spinner } from "components/Loader";
export const DashboardPage = (props) => {
  const { user: userData } = useSelector((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);

  const categoryPerPage = 10;
  const pagesVisited = pageNumber * categoryPerPage;
  const id = userData?.id;
  const [data, setData] = useState([]);
  const [anscount, setAnsCount] = useState([]);
  const [score, setScore] = useState([]);
  const getData = async () => {
    const res = await axios.get(
      `https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/getCategories`
    );
    setData(res.data.result);
  };
  const categories = data
    .slice(pagesVisited, pagesVisited + categoryPerPage)
    .map((pd) => {
      return (
        <div className="row">
          <div className="col-12">
            <Link to={"/questions/" + pd.id}>
              <PlainCard
                subTitle={pd.definition}
                mainTitle={pd.details.name}
                className="dashboard-categories-list"
              />
            </Link>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(data.length / categoryPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  //User Anser Count
  const getUserAnswer = async () => {
    const res = await axios.get(
      `https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/answer/${id}`
    );
    const data = res.data.result;
    setAnsCount(data.length);
  };
  //User Score
  const getUserScore = async () => {
    const res = await axios.get(
      `https://6d9agu86aa.execute-api.us-east-1.amazonaws.com/dev/get-user-score/${id}`
    );
    const data = res.data.result;
    setScore(data.score);
  };
  useEffect(() => {
    getData();
    getUserAnswer();
    getUserScore();
  }, []);
  const { networkProgressDialog: open } = useSelector((state) => state.loader);
  return (
    <>
      <div className="pb-30 content-panel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <div className="dashboard">
                  <div className="pt-20 page-title">
                    <h1 className="mb-15 lato-semi-bold-white-34px fw-700">
                      Dashboard
                    </h1>
                  </div>
                  <div className="pb-30 count-cards">
                    <div className="row">
                      <div className="col-6">
                        {anscount ? (
                          <NormalCard
                            color="blue"
                            count={anscount}
                            title="Added Definitions"
                          />
                        ) : (
                          <NormalCard
                            color="blue"
                            count="34"
                            title="Added Definitions"
                          />
                        )}
                      </div>
                      <div className="col-6">
                        {anscount ? (
                          <NormalCard
                            color="orange"
                            count={score}
                            title="Your Score"
                          />
                        ) : (
                          <NormalCard
                            color="orange"
                            count="34"
                            title="Your Score"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {categories.length <= 0 ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className="dashboard-categories">
                        <div className="section-title">
                          <div className="row">
                            <div className="col-12">
                              <h2 className="mb-20 lato-bold-22px fw-700">
                                Categories
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="dashboard-categories-listing">
                          {categories}
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
                      </div>
                    </>
                  )}
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
