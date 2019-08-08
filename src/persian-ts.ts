// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
import {
    arabicChars, arabicNumbers, englishChar, englishNumbers, pattern, persianChar, persianChars,
    persianNumbers, replacedPattern
} from './constants';

export default class PersianTs {
  constructor(private value: string) {
    this.value = value.trim()
  }

  arabicChar() {
    let tempValue = this.value
    const charsLen = arabicChars.length
    for (let i = 0; i < charsLen; i++) {
      tempValue = tempValue.replace(new RegExp(arabicChars[i], 'g'), persianChars[i])
    }
    this.value = tempValue
    return this
  }

  arabicNumber() {
    let tempValue = this.value
    const numbersLen = arabicNumbers.length
    for (let i = 0; i < numbersLen; i++) {
      tempValue = tempValue.replace(new RegExp(arabicNumbers[i], 'g'), persianNumbers[i])
    }
    this.value = tempValue
    return this
  }

  persianNumber() {
    let tempValue = this.value
    const numbersLen = englishNumbers.length

    for (let i = 0; i < numbersLen; i++) {
      tempValue = tempValue.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i])
    }
    this.value = tempValue
    return this
  }

  englishNumber() {
    let tempValue = this.value
    const numbersLen = persianNumbers.length
    for (let i = 0; i < numbersLen; i++) {
      tempValue = tempValue.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i])
    }
    this.value = tempValue
    return this
  }

  toEnglishNumber() {
    let tempValue = this.value
    const numbersLen = englishNumbers.length
    for (let i = 0; i < numbersLen; i++) {
      tempValue = tempValue
        .replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i])
        .replace(new RegExp(arabicNumbers[i], 'g'), englishNumbers[i])
    }
    this.value = tempValue

    return this
  }

  fixURL() {
    let tempValue = this.value
    // Replace every %20 with _ to protect them from decodeURI
    let old = ''
    while (old !== tempValue) {
      old = tempValue
      tempValue = tempValue.replace(/(http\S+?)\%20/g, '$1\u200c\u200c\u200c_\u200c\u200c\u200c')
    }
    // Decode URIs
    // NOTE: This would convert all %20's to _'s which could break some links
    // but we will undo that later on
    tempValue = tempValue.replace(/(http\S+)/g, function(s, p) {
      return decodeURI(p)
    })
    // Revive all instances of %20 to make sure no links is broken
    tempValue = tempValue.replace(/\u200c\u200c\u200c_\u200c\u200c\u200c/g, '%20')

    this.value = tempValue

    return this
  }

  decodeURL() {
    return this.fixURL()
  }

  switchKey() {
    let tempValue = this.value
    const charsLen = persianChar.length
    for (let i = 0; i < charsLen; i++) {
      tempValue = tempValue.replace(new RegExp(persianChar[i], 'g'), englishChar[i])
    }

    this.value = tempValue

    return this
  }

  digitsToWords() {
    let tempValue = this.value

    let delimiter
    let digit
    let i
    let iThree
    let numbers: any
    let parts
    let result
    let resultThree
    let three

    parts = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون', 'کویینتیلیون', 'سکستیلیون']
    numbers = {
      0: ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
      1: ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
      2: ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
      two: [
        'ده',
        'یازده',
        'دوازده',
        'سیزده',
        'چهارده',
        'پانزده',
        'شانزده',
        'هفده',
        'هجده',
        'نوزده'
      ],
      zero: 'صفر'
    }
    delimiter = ' و '

    let valueParts = tempValue
      .split('')
      .reverse()
      .join('')
      .replace(/\d{3}(?=\d)/g, '$&,')
      .split('')
      .reverse()
      .join('')
      .split(',')
      .map(function(str) {
        return Array(4 - str.length).join('0') + str
      })

    result = (function() {
      let _results
      _results = []
      for (iThree in valueParts) {
        three = valueParts[iThree]

        resultThree = (function() {
          let _i
          let _len
          let _results1

          _results1 = []

          for (i = _i = 0, _len = three.length; _i < _len; i = ++_i) {
            digit = three[i]
            if (i === 1 && digit === '1') {
              _results1.push(numbers.two[three[2]])
            } else if ((i !== 2 || three[1] !== '1') && numbers[i][digit] !== '') {
              _results1.push(numbers[i][digit])
            } else {
              continue
            }
          }

          return _results1
        })()

        resultThree = resultThree.join(delimiter)
        let _result = resultThree
          ? resultThree + ' ' + parts[valueParts.length - parseInt(iThree, undefined) - 1]
          : resultThree
        _results.push(_result)
      }
      return _results
    })()

    result = result.filter(function(x) {
      return x.trim() !== ''
    })

    result = result.join(delimiter).trim()
    if (result === '') {
      result = numbers.zero
    }

    this.value = result

    return this
  }

  halfSpace() {
    let tempValue = this.value

    // Replace Zero-width non-joiner between persian MI.
    tempValue = tempValue.replace(new RegExp(pattern), '$2\u200C$4')

    // Replace Zero-width non-joiner between perisan De-Yii.
    tempValue = tempValue.replace(new RegExp(replacedPattern), '$2\u200C$4')

    this.value = tempValue

    return this
  }

  toString() {
    let tempValue = this.value

    this.value = tempValue

    return this.value
  }
}
