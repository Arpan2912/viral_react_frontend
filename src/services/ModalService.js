import swal from 'sweetalert';

export default class ModalService {

  static openAlert(title,msg,suceess){
    swal(title, msg, suceess);
  }

}