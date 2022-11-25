import { NormalRadio, NormalTextArea } from 'components/common';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/Search/action';

//import 'assets/css/custom.css';

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [selectVal, setSelectVal] = useState([]);
  const [child, setChild] = useState([]);
  const [illness, setIllness] = useState({
    name: '',
    description: '',
  });

  const { search: searchData } = useSelector((state) => state.search);

  const handleSearch = (event) => {
    const target = event?.target;
    const value = target?.value;
    clearRadioGroup('radio');
    setSearch(value);
    setChild([]);
    setSelectVal('');
    setIllness({
      name: '',
      description: '',
    });
    dispatch(actions.searchData(search));
  };

  const handleSelect = (event, item) => {
    if (item.actions !== '' && item.actions.length > 0) {
      if (event.target.checked) {
        setSelectVal([...selectVal, item]);
        setChild(item.actions);
      } else {
        const data = selectVal;
        data.filter((i) => i.screen_presense !== item.screen_presense);
        setSelectVal(data);
      }
      clearRadioGroup('radio');

      setIllness({
        name: '',
        description: '',
      });
    } else {
      setIllness({ name: item.Name, description: item.Definition });
    }
  };

  const handleCloseDisease = (e, name) => {
    debugger;
    e.preventDefault();
    const data = selectVal;
    const i = data.map((object) => object.screen_presense).indexOf(name);
    const newData = data.slice(0, i);
    setSelectVal(newData);
    if (newData.length > 0) setChild(newData[newData.length - 1]?.actions);
    else setChild([]); setIllness({
      name: '',
      description: '',
    });
    clearRadioGroup('radio');
  };
  const clearRadioGroup = (GroupName) => {
    var ele = document.getElementsByName(GroupName);
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  };

  return (
    <>
      <div className="pb-30 content-panel">
        <div className="container-fluid">
          <div className="content">
            <div className="relative create-patient mb-25 illness-questionnaire-search">
              <div className="questionnaire-search">
                <div className="input-group input-group-lg">
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_749_7190)">
                        <path
                          d="M23.822 20.88L17.469 14.526C18.399 13.061 18.936 11.326 18.936 9.467C18.937 4.248 14.689 0 9.468 0C4.247 0 0 4.248 0 9.468C0 14.689 4.247 18.937 9.468 18.937C11.236 18.937 12.889 18.45 14.307 17.604L20.703 24L23.822 20.88ZM3.528 9.468C3.528 6.195 6.193 3.53 9.467 3.53C12.742 3.53 15.407 6.194 15.407 9.468C15.407 12.743 12.742 15.407 9.467 15.407C6.193 15.407 3.528 12.743 3.528 9.468Z"
                          fill="#3D558B"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_749_7190">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
              </div>
            </div>
            <div className="section-outer create-patient search-question-listing">
              <form>
                <div className="search-questions-list">
                  <div className="col-12 mb-3 d-flex">
                    {selectVal.length > 0 &&
                      selectVal.map((item, index) => {
                        return (
                          <div
                            className="btn rounded-pill btnBackground me-2"
                            key={index}
                          >
                            {item.screen_presense} &nbsp;
                            <span
                              onClick={(e) =>
                                handleCloseDisease(e, item.screen_presense)
                              }
                            >
                              ✖
                            </span>
                          </div>
                        );
                      })}
                  </div>
                  {child.length > 0
                    ? child.map((item, index) => {
                        return (
                          <div className="row" key={index}>
                            <div className="col-12">
                              <div className="radius-8 mb-30 search-question">
                                <NormalRadio
                                  class="form-check-input"
                                  type="radio"
                                  value=""
                                  label={item.screen_presense}
                                  id={`search-question${index}`}
                                  name="radio"
                                  onClick={(e) => handleSelect(e, item)}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : searchData.length > 0 &&
                      searchData.map((item, index) => {
                        return (
                          <div className="row" key={index}>
                            <div className="col-12">
                              <div className="radius-8 mb-30 search-question">
                                <NormalRadio
                                  class="form-check-input"
                                  type="radio"
                                  value=""
                                  label={item.screen_presense}
                                  id={`search-question${index}`}
                                  name="radio"
                                  onClick={(e) => handleSelect(e, item)}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
                
                {illness.name && (
                  <>
                  <div className="search-questions-list none">
                  <div className="row">
                    <div className="col-12">
                      <NormalTextArea
                        label="Please provide more details about fever"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Please provide more details about fever"
                      />
                    </div>
                  </div>
                </div>
                  <div className="search-questions-list mb-15 radius-8 illness-results">
                    <div className="row">
                      <div className="col-12">
                        <div className="pb-15 illness-result">
                          <div className="illness-result-title">
                            Possible illness :
                          </div>
                          <div className="pl-10 illness-result-text">
                            {illness.name}
                          </div>
                        </div>
                        <div className="illness-result-description">
                          <div className="pb-10 illness-result-title">
                            Description
                          </div>
                          <div className="line-height-26 illness-result-text">
                            {illness.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </>
                )}
                <div className="search-questions-list">
                  <div className="row">
                    <div className="col-12">
                      <div className="button-box">
                        <button
                          className="btn btn-primary icon-btn"
                          type="submit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M0 7L6.41667 8.80833L10.5 4.08333L5.74233 7.392L3.227 6.69083L12.1882 2.21083L9.87 10.71L7.6825 8.76225L6.41667 10.4685V10.0199L5.25 9.69325V14L7.85925 10.4819L10.5 12.8333L14 0L0 7Z"
                              fill="white"
                            ></path>
                          </svg>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
