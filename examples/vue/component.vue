<template>
  <component
      :is="actualizeTag"
      v-ripple
      tabindex="0"
      type="button"
      class="truncate inline-flex items-center border font-semibold tracking-wider focus:outline-none transition-colors cursor-pointer"
      :class="classes"
      v-bind="bindingProps"
      v-on="$listeners"
  >
    <!--    Content-->
    <div class="relative mx-auto">
      <span class="flex items-center" :class="{ 'opacity-0': loading }">
        <icon-component
            v-if="icon"
            :name="icon"
            :class="{ 'mr-2': $slots.default }"
            :size="size"
        />
        <slot />
      </span>

      <spinner-component v-if="loading" :size="size" />
    </div>
  </component>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import SizeableMixin from '@digital-platform/helpers/mixins/sizeable.mixin';
import ColorableMixin from '@digital-platform/helpers/mixins/colorable.mixin';
import VariantableMixin from '@digital-platform/helpers/mixins/variantable.mixin';
import RouteableMixin from '@digital-platform/helpers/mixins/routeable.mixin';
import IconComponent from '../icon/index.vue';
import SpinnerComponent from '../spinner/index.vue';

@Component({
  name: 'button-compaonent',

  components: {
    IconComponent,
    SpinnerComponent,
  },
})
export default class Button extends mixins(ColorableMixin, SizeableMixin, VariantableMixin, RouteableMixin) {
  @Prop({
    default: false,
    type: Boolean,
  })
  loading!: boolean;

  @Prop({
    default: '',
    type: String,
  })
  icon!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  rounded!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  block!: boolean;

  get classes() {
    return [
      `${this.block ? 'w-full' : ''}`,
      `${this.loading || this.disabled ? 'pointer-events-none' : ''}`,
      `${this.rounded ? 'rounded-full' : 'rounded'}`,
      this.sizeClasses,
      `${this.disabled ? 'bg-disabled' : this.bgColorClasses}`,
      this.variantClasses,
    ].join(' ');
  }

  get sizeClasses() {
    switch (this.size) {
      case 'xs':
        return 'px-1.5 h-8 text-xs leading-4';
      case 'sm':
        return 'px-2 h-9 text-sm leading-4';
      case 'lg':
        return 'px-2 h-11 text-base';
      case 'xl':
        return 'px-3 h-12 text-base';

      default:
        return 'px-4 h-10 text-sm';
    }
  }

  get variantClasses() {
    const coloredText = this.disabled ? 'text-disabled' : this.textColorClasses;
    switch (this.variant) {
      case 'outlined':
        return `${this.disabled ? 'border-disabled' : this.borderColorClasses} bg-opacity-0 hover:bg-opacity-20 ${coloredText}`;

      case 'plain':
        return `border-transparent bg-opacity-0 ${coloredText} text-opacity-60 hover:text-opacity-100`;

      case 'secondary':
        return `border-transparent bg-opacity-20 hover:bg-opacity-40 ${coloredText}`;

      case 'text':
        return `border-transparent bg-opacity-0 hover:bg-opacity-20 ${coloredText}`;
      default:
        return `${this.disabled ? 'border-transparent' : this.borderColorClasses} text-white hover:bg-opacity-80`;
    }
  }
}
</script>
