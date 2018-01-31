import vm from '../main'

export default function showSnackbar (message, actionText, actionUrl) {
  let options = { message }
  if (actionText) options = {...options, actionText}
  if (actionUrl) options = {...options, actionHandler: function () { window.open(actionUrl, '_blank') }}

  vm.$root.$emit('show-snackbar', options)
}
