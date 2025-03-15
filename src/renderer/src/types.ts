export class PromptClass {
  id: number
  title: string
  description: {
    general: string
    subject: string
    hair: string
    eyes: string
    face: string
    expression: string
    clothes: string
    pose: string
  }

  constructor(id: number) {
    this.id = id
    this.title = ''
    this.description = {
      general: '',
      subject: '',
      hair: '',
      eyes: '',
      face: '',
      expression: '',
      clothes: '',
      pose: ''
    }
  }
}
