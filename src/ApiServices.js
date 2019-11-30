import Xhr from './Xhr';
import { getIdFromUrl } from './utils';

const BASE = 'https://swapi.co/api/';

export const getPeople = () => {
	var promise = new Promise(function(resolve, reject){
		var arr = {}, resIndex = 0;
		for (var i = 1; i < 10; i++) {
			Xhr(`${BASE}people/?page=${i}`)
			  .then(res => {
				
				res.results.map(person => {
					var id = getIdFromUrl(person.url);
					arr[id] = person;
					// console.log(arr);
				});
				// var indexTemp = res.next != null ? parseInt(res.next.replace("https://swapi.co/api/people/?page=", "")) - 2 : 9;
				// arr[indexTemp] = res;
				++resIndex;
				// arr[`${resIndex}`] = res;
				if (resIndex === 9) {
					resolve(arr);
				}
			})
			.catch(err => {
				++resIndex;
				if (resIndex === 9) {
					resolve(arr);
				}
				console.log(err);
			})
		}
	});
	return promise;
};

// Xhr(`${BASE}people/?page=${id}`);

export const getContent = (urlArr) => {
	var promise = new Promise(function(resolve, reject){
		if (typeof urlArr === 'string') {
			var result = {};
			Xhr(urlArr)
			.then(res => {
				result = res;
				resolve(result);
			})
			.catch(err => {
				// arr.push({});
				resolve(result);
				console.log(err);
			})
		} else {
			var arr = [], resIndex = 0;
			for (var i = 0; i < urlArr.length; i++) {
				Xhr(urlArr[i])
				.then(res => {
					++resIndex;
					arr.push(res);
					if (resIndex === urlArr.length) {
						resolve(arr);
					}
				})
				.catch(err => {
					// arr.push({});
					++resIndex;
					if (resIndex === urlArr.length) {
						resolve(arr);
					}
					console.log(err);
				})
			}
		}
	});
	return promise;
    
	// return arr;
};
export const getPerson = (id) => Xhr(`${BASE}people/${id}`);