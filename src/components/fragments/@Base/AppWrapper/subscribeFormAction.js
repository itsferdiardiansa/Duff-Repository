export default (payload, router) => {
  if (['form.create', 'form.update', 'form.delete'].includes(payload?.action)) {
    const alertType = payload.status === 'failed' ? 'danger' : 'success'

    self.$alert.show({
      variant: alertType,
      content: payload.message,
    })

    if (
      ['form.create', 'form.update'].includes(payload.action) &&
      payload.status !== 'failed' &&
      Reflect.has(payload, 'redirectUrl')
    ) {
      router.push(payload.redirectUrl)
    }
  }
}
