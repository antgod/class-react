const initializeCityDatabase = ()=>new Promise((res,reg)=>{
  setTimeout(res('initializeCityDatabase'), 1000)
})

const clearCityDatabase = ()=>new Promise((res,reg)=>{
  setTimeout(res('clearCityDatabase'), 1000)
})

const isCity = () => {
  return true
}

beforeEach(() => {
  return initializeCityDatabase().then(data=> console.log(data));
});

afterEach(() => {
  return clearCityDatabase().then(data=> console.log(data));
});

test('city database has Vienna', () => {
  console.log('city database has Vienna')
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  console.log('city database has San Juan')
  expect(isCity('San Juan')).toBeTruthy();
});