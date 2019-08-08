import PersianTs from '../src/persian-ts';

describe('arabic convert', () => {
  it('should convert arabic letters to persian', () => {
    expect(new PersianTs('يكدِبِزِذِشِسِى').arabicChar().toString()).toEqual('یکدبزذشسی')
  })

  it('should convert arabic numbers to persian', () => {
    expect(new PersianTs('١٢٣٤٥٦٧٨٩٠').arabicNumber().toString()).toEqual('۱۲۳۴۵۶۷۸۹۰')
  })

  it('should convert arabic numbers and letters to persian', () => {
    expect(
      new PersianTs('١٢٣٤٥٦٧٨٩٠يكدِبِزِذِشِسِى')
        .arabicChar()
        .arabicNumber()
        .toString()
    ).toEqual('۱۲۳۴۵۶۷۸۹۰یکدبزذشسی')
  })
})

describe('persian convert', () => {
  it('should Convert Persian numbers to English', () => {
    expect(new PersianTs('۱۲۳۴۵۶۷۸۹۰').persianNumber().toString()).toEqual('1234567890')
  })
})

describe('english convert', () => {
  it('should Convert English numbers to Persian', () => {
    expect(new PersianTs('1234567890').englishNumber().toString()).toEqual('۱۲۳۴۵۶۷۸۹۰')
  })

  it('should Convert Persian and Arabic numbers to English', () => {
    expect(new PersianTs('۱۲۳۴۵۶۷۸۹۰١٢٣٤٥٦٧٨٩٠').toEnglishNumber().toString()).toEqual(
      '12345678901234567890'
    )
  })
})

describe('etc', () => {
  it('should decode unreadable characters to correct Persian characters', () => {
    expect(
      new PersianTs(
        'https://fa.wikipedia.org/wiki/%D8%B5%D9%81%D8%AD%D9%87%D9%94_%D8%A7%D8%B5%D9%84%DB%8C'
      )
        .decodeURL()
        .toString()
    ).toEqual('https://fa.wikipedia.org/wiki/صفحهٔ_اصلی')
  })
  it('should Convert Persian Chars to English Chars', () => {
    expect(new PersianTs('ضصثقفغعهخحجچشسیبلاتنمکگظطزرذدپو؟').switchKey().toString()).toEqual(
      "qwertyuiop[]asdfghjkl;'zxcvbnm,?"
    )
  })
  it('should convert numbers to Persian words', () => {
    expect(new PersianTs('999999999999').digitsToWords().toString()).toEqual(
      'نهصد و نود و نه میلیارد و نهصد و نود و نه میلیون و نهصد و نود و نه هزار و نهصد و نود و نه'
    )
    expect(new PersianTs('1374').digitsToWords().toString()).toEqual(
      'یک هزار و سیصد و هفتاد و چهار'
    )
    expect(new PersianTs('19').digitsToWords().toString()).toEqual('نوزده')
  })
  it('should convert to Zero-width non-joiner correction', () => {
    expect(new PersianTs('آمده ای ولی من رفته ام و می آییم').halfSpace().toString()).toEqual(
      'آمده‌ای ولی من رفته‌ام و می‌آییم'
    )
  })
})
