// import Xhr from './Xhr';

export function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

// export function fetchPeopleData(){
//   var 
// }
export function getIdFromUrl(url) {
  if (typeof url === 'string') {
    var tempId = url.replace("https://swapi.co/api/people/", "");
    tempId = tempId.replace("/", "");
    return tempId;
  } else {
    return false;
  };
}

export function setLocalPeopleData(res) {
  var getList = localStorage.getItem("personList");
  var globalObj = {};
  var idListTemp = [];
  var pdListTemp = [];
  if (getList) {
    var parsedList = getList !== "" ? JSON.parse(getList) : false;
    if (parsedList && parsedList.pdList.length > 0) {
      pdListTemp = parsedList.pdList;
      idListTemp = parsedList.idList;
    }
  }
  idListTemp = idListTemp.concat([getIdFromUrl(res.url)]);
  pdListTemp = pdListTemp.concat([res]);
  globalObj = {
    idList: idListTemp,
    pdList: pdListTemp
  };
  localStorage.setItem("personList", JSON.stringify(globalObj));
}