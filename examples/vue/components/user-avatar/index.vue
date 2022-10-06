<template>
  <span class="relative overflow-hidden inline-flex  rounded-full ">
    <img :src="src" alt="user-avatar" :class="classes">
  </span>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import SizeableMixin, { Size } from '@digital-platform/helpers/mixins/sizeable.mixin'
import ShapeableMixin, { Shape } from "@digital-platform/helpers/mixins/shapeable.mixin";

@Component({
  name: 'avatar',
})
export default class Avatar extends mixins(SizeableMixin, ShapeableMixin) {
  @Prop({
    default: '/avatars/default.png'
  })
  src!: string

  get sizeClasses() {
    switch (this.size) {
      case Size.xs:
        return 'h-6 w-6'

      case Size.sm:
        return 'h-8 w-8'

      case Size.lg:
        return 'h-12 w-12'

      case Size.xl:
        return 'h-14 w-14'

      default:
        return 'h-10 w-10'
    }
  }

  get shapeClasses() {
    switch (this.shape) {
      case Shape.square:
        return 'rounded-md'

      default:
        return 'rounded-full'
    }
  }

  get classes() {
    return Array.from(new Set([
      ...this.sizeClasses.split(' '),
      ...this.shape.split(' ')
    ]))
  }
}
</script>
