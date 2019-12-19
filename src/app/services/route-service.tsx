import RoutesConfig from '../config/Routes.config';

const RouteService: any ={
redirectToErrorPage(): void {
  window.location.pathname = RoutesConfig.routes.error},

  getPathToAnswersPage(id: string): string {
    return `${RoutesConfig.routes.answers.slice(0, -3)}${id}`
  },
  getPathToUserInfoPage(id: string): string {
    return `${RoutesConfig.routes.userInfo.slice(0, -3)}${id}`
  },

  redirectToUserInfoPage(userId: string):void{
    window.location.pathname = `${RoutesConfig.routes.userInfo.slice(0, -3)}${userId}`; 
  }
 }

export default RouteService;