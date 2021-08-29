import {
  arabicChars,
  arabicNumbers,
  englishChar,
  englishNumbers,
  pattern,
  persianChar,
  persianChars,
  persianNumbers,
  replacedPattern
} from './constants'

/**
 * Main class for handling conversion
 * it's using builder pattern to create the desired output
 */
class PersianTs {
  /**
   * Creates an instance of persian ts.
   * 
   * @param value value to be transformed
   */
  constructor(private value: string) {
    this.value = value.trim()
  }

  /**
   * converts string containing arabic characters to persian
   * 
   * @returns  PersianTs instance
   */
  arabicChar():PersianTs {
    let tempValue = this.value
    const charsLen = arabicChars.length
    for (let i = 0; i < charsLen; i += 1) {
      tempValue = tempValue.replace(new RegExp(arabicChars[i], 'g'), persianChars[i])
    }
    this.value = tempValue
    return this
  }

  /**
   * converts string containing arabic numerals to persian
   * 
   * @returns  PersianTs instance
   */
  arabicNumber():PersianTs {
    let tempValue = this.value
    const numbersLen = arabicNumbers.length
    for (let i = 0; i < numbersLen; i +=1) {
      tempValue = tempValue.replace(new RegExp(arabicNumbers[i], 'g'), persianNumbers[i])
    }
    this.value = tempValue
    return this
  }

  /**
   * converts string containing persian numerals to english
   * 
   * @returns  PersianTs instance
   */
  persianNumber():PersianTs {
    let tempValue = this.value
    const numbersLen = englishNumbers.length

    for (let i = 0; i < numbersLen; i +=1) {
      tempValue = tempValue.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i])
    }
    this.value = tempValue
    return this
  }

  /**
   * converts string containing english numerals to persian
   * 
   * @returns  PersianTs instance
   */
  englishNumber():PersianTs {
    let tempValue = this.value
    const numbersLen = persianNumbers.length
    for (let i = 0; i < numbersLen; i +=1) {
      tempValue = tempValue.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i])
    }
    this.value = tempValue
    return this
  }

  /**
   * converts string containing persian and arabic numerals to english
   * 
   * @returns  PersianTs instance
   */
  toEnglishNumber():PersianTs {
    let tempValue = this.value
    const numbersLen = englishNumbers.length
    for (let i = 0; i < numbersLen; i +=1) {
      tempValue = tempValue
        .replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i])
        .replace(new RegExp(arabicNumbers[i], 'g'), englishNumbers[i])
    }
    this.value = tempValue

    return this
  }

  /**
   * Used to convert unreadable Persian characters in URL to readable characters.
   * 
   * @returns  PersianTs instance
   */
  fixURL():PersianTs {
    let tempValue = this.value
    // Replace every %20 with _ to protect them from decodeURI
    let old = ''
    while (old !== tempValue) {
      old = tempValue
      tempValue = tempValue.replace(/(http\S+?)%20/g, '$1\u200c\u200c\u200c_\u200c\u200c\u200c')
    }
    // Decode URIs
    // NOTE: This would convert all %20's to _'s which could break some links
    // but we will undo that later on
    tempValue = tempValue.replace(/(http\S+)/g, (_s, p) => decodeURI(p))
    // Revive all instances of %20 to make sure no links is broken
    tempValue = tempValue.replace(/\u200c\u200c\u200c_\u200c\u200c\u200c/g, '%20')

    this.value = tempValue

    return this
  }

  /**
   * Used to convert unreadable Persian characters in URL to readable characters.
   * 
   * @returns  PersianTs instance
   */
  decodeURL():PersianTs {
    return this.fixURL()
  }

  /**
   * Used for converting Persian char to English char.
   * 
   * @returns  PersianTs instance
   */
  switchKey():PersianTs {
    let tempValue = this.value
    const charsLen = persianChar.length
    for (let i = 0; i < charsLen; i +=1) {
      tempValue = tempValue.replace(new RegExp(persianChar[i], 'g'), englishChar[i])
    }

    this.value = tempValue

    return this
  }

  // /**
  //  * Used for representing numbers as Persian words.
  //  * 
  //  * @returns  PersianTs instance
  //  */
  // digitsToWords():PersianTs {
  //   const tempValue = this.value

  //   let digit
  //   let i
  //   let iThree
  //   let result
  //   let resultThree
  //   let three

  //   const parts = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون', 'کویینتیلیون', 'سکستیلیون']
  //   const  numbers = {
  //     0: ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
  //     1: ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
  //     2: ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
  //     two: [
  //       'ده',
  //       'یازده',
  //       'دوازده',
  //       'سیزده',
  //       'چهارده',
  //       'پانزده',
  //       'شانزده',
  //       'هفده',
  //       'هجده',
  //       'نوزده'
  //     ],
  //     zero: 'صفر'
  //   }
  //   const delimiter = ' و '

  //   const valueParts = tempValue
  //     .split('')
  //     .reverse()
  //     .join('')
  //     .replace(/\d{3}(?=\d)/g, '$&,')
  //     .split('')
  //     .reverse()
  //     .join('')
  //     .split(',')
  //     .map((str) => Array(4 - str.length).join('0') + str)

  //   result = (() => {
      
  //     const results = []
  //     for (iThree in valueParts) {
  //       three = valueParts[iThree]

  //       resultThree = (() => {
  //         let _i = 0
  //         let _len
  //         let _results1

  //         _results1 = []

  //         // eslint-disable-next-line no-multi-assign
  //         for (i = _i = 0, _len = three.length; _i < _len; i = _i += 1) {
  //           digit = three[i]
  //           if (i === 1 && digit === '1') {
  //             _results1.push(numbers.two[three[2]])
  //           } else if ((i !== 2 || three[1] !== '1') && numbers[i][digit] !== '') {
  //             _results1.push(numbers[i][digit])
  //           } 
  //         }

  //         return _results1
  //       })()

  //       resultThree = resultThree.join(delimiter)
  //       const _result = resultThree
  //         ? `${resultThree  } ${  parts[valueParts.length - parseInt(iThree, 10) - 1]}`
  //         : resultThree
  //       results.push(_result)
  //     }
  //     return results
  //   })()

  //   result = result.filter((x) => x.trim() !== '')

  //   result = result.join(delimiter).trim()
  //   if (result === '') {
  //     result = numbers.zero
  //   }

  //   this.value = result

  //   return this
  // }

  /**
   * Zero-width non-joiner correction
   * 
   * @returns  PersianTs instance
   */
  halfSpace():PersianTs {
    let tempValue = this.value

    // Replace Zero-width non-joiner between persian MI.
    tempValue = tempValue.replace(new RegExp(pattern), '$2\u200C$4')

    // Replace Zero-width non-joiner between perisan De-Yii.
    tempValue = tempValue.replace(new RegExp(replacedPattern), '$2\u200C$4')

    this.value = tempValue

    return this
  }

  /**
   * returns the converted string value.
   * 
   * @returns  converted string value
   */
  toString():string {
    const tempValue = this.value

    this.value = tempValue

    return this.value
  }
}

export default PersianTs