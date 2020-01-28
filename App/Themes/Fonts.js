const type = {
  base: 'HelveticaNeue-Light',
  bold: 'HelveticaNeue-Medium',
  emphasis: 'HelveticaNeue-MediumItalic'
}

const size = {
  h1: 44,
  h2: 32,
  h3: 24,
  h4: 22,
  h5: 20,
  h6: 19,
  input: 19,
  regular: 17,
  medium: 15,
  small: 14,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontFamily: type.base,
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.base,
    fontSize: size.h3
  },
  h3i: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6
  },
  h6i: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
