import {IUser, IUserRating, IPersonalInfo} from './user.model';
import {Question} from "../questions";

// export interface IUserState{
//     user: IUser;
// }

export const defaultUserState = {
    // user:{
    id: Math.random().toString().slice(5, 15),
    password: '',
    personalData: {
        firstName: '',
        lastName: '',
        email: '',
        progLanguages: [],
        workingPosition: '',
        workExperience: ''
    },
    questions: [],
    rating: {
        questionsTotal: 0,
        answersTotal: 0,
        answersAcceptedByOthers: 0,
        answersLikedByOthers: 0,
    },
// }
};


// export const defaultUserState: IUser ={    id: '9586434820',
// password: 'fffFFF12345',
// personalData: {
//     firstName: 'Tania',
//     lastName: 'Gashtold',
//     email: 'gashtold_tania@mail.ru',
//     progLanguages: ['js'],
//     workingPosition: 'noo',
//     workExperience: '5'
// },
// questions: [
//     {
//         id: '9586567820',
//         author: {
//             id: '9586434820',
//             password: 'fffFFF12345',
//             personalData: {
//                 firstName: 'Tania',
//                 lastName: 'Gashtold',
//                 email: 'gashtold_tania@mail.ru',
//                 progLanguages: [] ,
//                 workingPosition: 'noo',
//                 workExperience: '5'
//             },
//             rating: {
//                 questionsTotal: 2,
//                 answersTotal: 6,
//                 answersAcceptedByOthers: 3,
//                 answersLikedByOthers: 2
//             }
//         },
//         title: 'How to outline text11111',
//         creationDate: new Date(),
//         description: 'detailed1111111111111 description of the question',
//         isClosed: false
//     },
//     {
//         id: '9876567820',
//         author: {
//             id: '9586434820',
//             password: 'fffFFF12345',
//             personalData: {
//                 firstName: 'Tania',
//                 lastName: 'Gashtold',
//                 email: 'gashtold_tania@mail.ru',
//                 progLanguages: [ 'js' ],
//                 workingPosition: 'noo',
//                 workExperience: '5'
//             },
//             rating: {
//                 questionsTotal: 2,
//                 answersTotal: 6,
//                 answersAcceptedByOthers: 3,
//                 answersLikedByOthers: 2
//             }
//         },
//         title: 'How to outline text2222222',
//         creationDate: new Date(),
//         description: 'detailed222222222222222 description of the question',
//         isClosed: false
//     }
// ],
// rating: {
//     questionsTotal: 2,
//     answersTotal: 6,
//     answersAcceptedByOthers: 3,
//     answersLikedByOthers: 2
// }}