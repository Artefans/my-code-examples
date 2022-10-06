<template>
  <client-only>
    <transition @after-enter="showOverlay = true">
      <div
        v-if="innerValue"
        class="
          fixed
          z-[90]
          inset-0
          overflow-hidden
          flex flex-col items-center justify-end sm:justify-center
          pt-4 sm:p-4 md:p-12"
        role="dialog"
        aria-modal="true"
      >
        <!-- Overlay -->
        <transition
          enter-active-class="ease-in-out duration-150"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in-out duration-150"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
          @after-enter="showContent = true"
          @after-leave="innerValue = false"
        >
          <overlay-component v-if="showOverlay" @click="hideOnClickOverlay" />
        </transition>
        <!-- End overlay -->

        <!-- Content -->
        <transition
          enter-active-class="ease-out transform transition duration-150 sm:duration-300"
          enter-class="sm:opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
          enter-to-class="sm:opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transform transition ease-in duration-150"
          leave-class="sm:opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="sm:opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
          @after-leave="showOverlay = false"
        >
          <div
            v-if="showContent"
            class="relative z-50 w-full overflow-hidden"
            :class="maxWidth"
          >
            <panel-component>
              <panel-content-component>
                <div class="absolute right-1 top-1 z-10">
                  <button-component
                    v-if="closeable"
                    size="sm"
                    color="rose"
                    variant="text"
                    rounded
                    icon="outline/close-circle"
                    @click="hide"
                  />
                </div>

                <slot />
              </panel-content-component>
            </panel-component>
          </div>
        </transition>
        <!-- End content -->
      </div>
    </transition>
  </client-only>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'nuxt-property-decorator'
import OverlayComponent from '../overlay/index.vue'
import PanelComponent from '../panel/index.vue'
import PanelContentComponent from '../panel/content.vue'
import ButtonComponent from '../button/index.vue'

@Component({
  name: 'modal-component',

  components: {
    OverlayComponent,
    PanelComponent,
    PanelContentComponent,
    ButtonComponent
  }
})
export default class ModalComponent extends Vue {
  @Prop({
    default: false,
    type: Boolean,
  })
  value!: boolean

  @Prop({
    default: false,
    type: Boolean,
  })
  closeOnClickOverlay!: boolean

  @Prop({
    default: 'max-w-md',
    type: String,
  })
  maxWidth!: string

  @Prop({
    default: true,
    type: Boolean,
  })
  closeable!: boolean

  showOverlay = false

  showContent = false

  innerValue = false

  bodyClass = 'overflow-hidden'

  get body() {
    return document.querySelector('body')
  }

  hideOnClickOverlay() {
    if (this.closeOnClickOverlay) {
      this.hide()
    }
  }

  hide() {
    this.showContent = false
  }

  toggleBodyClass() {
    if (this.body) {
      this.body.classList.toggle(this.bodyClass)
    }
  }

  removeBodyClass() {
    if (this.body) {
      this.body.classList.remove(this.bodyClass)
    }
  }

  @Watch('value') onChangeValue(value: boolean) {
    if (value) {
      this.innerValue = value
    } else {
      this.hide()
    }
  }

  @Watch('innerValue') onChangeInnerValue(value: boolean) {
    this.toggleBodyClass()
    if (!value) {
      this.$emit('input', value)
      this.$emit('closed')
    }
  }

  mounted() {
    this.innerValue = this.value
  }

  beforeDestroy() {
    this.removeBodyClass()
  }
}
</script>
