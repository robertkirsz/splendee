interface IObjectKeys {
  [key: string]: string
}

export const getCardColor = ({ color }: { color: string }) => {
  const colors: IObjectKeys = {
    green: '#026f43',
    red: '#d31b23',
    black: '#36302f',
    blue: '#0a64d1',
    white: '#efece6',
  }

  return colors[color]
}

export const getCardStackColor = ({ level }: { level: number }) => {
  const colors: IObjectKeys = {
    1: '#839e3c',
    2: '#cc9749',
    3: '#0995c7',
  }

  return colors[level]
}

export const getGemColor = ({ color }: { color: string }) => {
  const colors: IObjectKeys = {
    green: '#026f43',
    red: '#d31b23',
    black: '#36302f',
    blue: '#0a64d1',
    white: '#efece6',
    gold: '#dacd39',
  }

  return colors[color]
}

export const sc = (propName: string) => (css: TemplateStringsArray | any) =>
  css.length
    ? (props: any) => (props[propName] ? css : undefined)
    : css[propName]

export const getById = <Item extends { id: number }>(
  array: Item[],
  id: number
) => array.find(item => item.id === id)

export const removeById = <Item extends { id: number }>(
  array: Item[],
  id: number
) => {
  const itemIndex = array.findIndex(item => item.id === id)

  if (itemIndex !== -1) array.splice(itemIndex, 1)
}

export const removeByIdAndReturn = <Item extends { id: number }>(
  array: Item[],
  id: number
) => {
  let item
  const itemIndex = array.findIndex(item => item.id === id)

  if (itemIndex !== -1) item = array.splice(itemIndex, 1)[0]

  return item
}

function calculatePosition(from: HTMLElement, to: HTMLElement, scale: number) {
  const { width: fromWidth, height: fromHeight } = from.getBoundingClientRect()

  const {
    width: toWidth,
    height: toHeight,
    top: toTop,
    left: toLeft,
  } = to.getBoundingClientRect()

  const left = toLeft + toWidth / 2 - (fromWidth * scale) / 2
  const top = toTop + toHeight / 2 - (fromHeight * scale) / 2

  return { top: `${top}px`, left: `${left}px`, transform: `scale(${scale})` }
}

export function flyCard(
  from: HTMLElement | null,
  to: HTMLElement | null,
  scale: number = 0.2
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!from || !to) return reject()

    const { top: fromTop, left: fromLeft } = from.getBoundingClientRect()

    const clone = from.cloneNode(true) as HTMLElement
    clone.style.top = `${fromTop}px`
    clone.style.left = `${fromLeft}px`
    clone.style.position = 'absolute'
    clone.style.transitionProperty = 'top, left, transform'
    clone.style.transitionDuration = '1s'
    clone.style.transformOrigin = 'left top'
    clone.style.pointerEvents = 'none'

    const currentDisplay = from.style.display

    clone.addEventListener('transitionend', () => {
      clone.remove()
      from.style.display = currentDisplay
    })

    document.body.appendChild(clone)

    const position = calculatePosition(from, to, scale)

    setTimeout(() => {
      from.style.display = 'none'
      clone.style.top = position.top
      clone.style.left = position.left
      clone.style.transform = position.transform
      resolve()
    })
  })
}

export function flyGem(
  from: HTMLElement | null,
  to: HTMLElement | null,
  scale: number = 0.34
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!from || !to) {
      reject()
      return
    }

    const { top: fromTop, left: fromLeft } = from.getBoundingClientRect()

    const clone = from.cloneNode(true) as HTMLElement
    clone.style.top = `${fromTop}px`
    clone.style.left = `${fromLeft}px`
    clone.style.opacity = '1'
    clone.style.marginTop = '0'
    clone.style.position = 'absolute'
    clone.style.transitionProperty = 'top, left, transform'
    clone.style.transitionDuration = '1s'
    clone.style.transformOrigin = 'left top'
    clone.style.pointerEvents = 'none'
    clone.innerText = ''

    clone.addEventListener('transitionend', () => {
      clone.remove()
      resolve()
    })

    document.body.appendChild(clone)

    const position = calculatePosition(from, to, scale)

    setTimeout(() => {
      clone.style.top = position.top
      clone.style.left = position.left
      clone.style.transform = position.transform
    })
  })
}
