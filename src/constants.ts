export const arabicNumbers = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠']

export const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰']

export const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

export const arabicChars = ['ي', 'ك', '‍', 'دِ', 'بِ', 'زِ', 'ذِ', 'ِشِ', 'ِسِ', 'ى']
export const persianChars = ['ی', 'ک', '', 'د', 'ب', 'ز', 'ذ', 'ش', 'س', 'ی']

export const persianChar = [
  'ض',
  'ص',
  'ث',
  'ق',
  'ف',
  'غ',
  'ع',
  'ه',
  'خ',
  'ح',
  'ج',
  'چ',
  'ش',
  'س',
  'ی',
  'ب',
  'ل',
  'ا',
  'ت',
  'ن',
  'م',
  'ک',
  'گ',
  'ظ',
  'ط',
  'ز',
  'ر',
  'ذ',
  'د',
  'پ',
  'و',
  '؟'
]
export const englishChar = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '?'
]

export const pattern = /((\s\u0645\u06CC)+( )+([\u0600-\u06EF]{1,}){1,})/g
export const replacedPattern = /(([\u0600-\u06EF]{1,})+( )+(ای|ایی|اند|ایم|اید|ام){1})/g
