import { NavigationAction, StackActions } from '@react-navigation/native';
let _navigator;

function setTopLevelNavigator(navigationRef) {
    _navigator = navigationRef;
}

function navigate(routeNames, params) {
    _navigator.navigate(routeNames, params);
    //   console.log(_navigator.navigate);
    return;
}
function goBack() {
    _navigator.dispatch(NavigationAction.back());
}
export default {
    setTopLevelNavigator,
    navigate,
    goBack,
};
