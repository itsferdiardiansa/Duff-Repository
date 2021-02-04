import { defineComponent } from "vue"
import globalSetting from '@plugin/globalSetting'

const AppWrapper = defineComponent({
  beforeCreate() {
    const { _ : { appContext }} = this.$root
    
    appContext.app.mixin(globalSetting)
    
  },
  render() {
    
    return this.$slots.default()
  }
})

export default AppWrapper