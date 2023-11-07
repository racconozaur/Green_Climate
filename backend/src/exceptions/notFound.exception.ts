import { NotFoundException } from '@nestjs/common'

export class ItemNotFoundException extends NotFoundException {
  constructor(item?: string) {
    super(`${item ?? 'Item'} with given credentials not found`)
  }
}
