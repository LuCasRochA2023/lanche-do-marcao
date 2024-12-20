import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

 const MySwal = withReactContent(Swal)

MySwal.fire({
  title: <p>Hello World</p>,
  didOpen: () => {
    MySwal.showLoading()
  },
}).then(() => {
  return MySwal.fire(<p>Shorthand works too</p>)
})
export default MySwal