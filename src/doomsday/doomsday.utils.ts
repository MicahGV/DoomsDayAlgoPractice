
export const CFS: { [idx: number]: number } = {
    17: 0,
    18: 2,
    19: 4,
    20: 5
}

interface Month {
    normal: number
    leap: number
    mnemonic: string
}

export const months: { [idx: number]: Month } = {
    0: {
        normal: 3,
        leap: 4,
        mnemonic: "Normally 3. 4 for leap year"
    },
    1: {
        normal: 0,
        leap: 1,
        mnemonic: "Normally 0. 1 for leap year"
    },
    2: {
        normal: 0,
        leap: 0,
        mnemonic: "3/0"
    },
    3: {
        normal: 4,
        leap: 4,
        mnemonic: "4/4"
    },
    4: {
        normal: 9,
        leap: 9,
        mnemonic: "9/5 5/9"
    },
    5: {
        normal: 6,
        leap: 6,
        mnemonic: "6/6"
    },
    6: {
        normal: 11,
        leap: 11,
        mnemonic: "7/11 11/7"
    },
    7: {
        normal: 8,
        leap: 8,
        mnemonic: "8/8"
    },
    8: {
        normal: 5,
        leap: 5,
        mnemonic: "9/5 5/9"
    },
    9: {
        normal: 10,
        leap: 10,
        mnemonic: "10/10"
    },
    10: {
        normal: 7,
        leap: 7,
        mnemonic: "7/11 to 11/7"
    },
    11: {
        normal: 12,
        leap: 12,
        mnemonic: "12/12"
    }
}

interface Day {
    name: string,
    mnemonic: string
}

export const doomDays: { [idx: number]: Day } = {
    0: {
        name: "Sunday",
        mnemonic: "None-day"
    },
    1: {
        name: "Monday",
        mnemonic: "One-day"
    },
    2: {
        name: "Tuesday",
        mnemonic: "Twos-day"
    },
    3: {
        name: "Wednesday",
        mnemonic: "w sideways 3"
    },
    4: {
        name: "Thursday",
        mnemonic: "Fours-day"
    },
    5: {
        name: "Friday",
        mnemonic: "Five-day"
    },
    6: {
        name: "Saturday",
        mnemonic: "Six-urday"
    }
}
export function get_day_of_week(date: Date) {
    let year = Math.floor(date.getFullYear() / 100)
    let month = date.getMonth()
    let days = date.getDate()
    let T = year

    if (T % 2 !== 0) {
        T += 11
    }
    T /= 2
    if (T % 2 !== 0) {
        T += 11
    }

    T = T + CFS[year]

    let monthValue = months[month]
    let monthFirstSunday = 0
    if (isLeapYear(date.getFullYear())) {
        monthFirstSunday = monthValue.leap
    } else {
        monthFirstSunday = monthValue.normal
    }
    T = T + monthFirstSunday

    // remove excess 7s
    T = T % 7
    
    let expectedDay = days - T
    let isNeg = Math.sign(expectedDay)
    if (isNeg === -1) {
        expectedDay = 7 - expectedDay
    }
    expectedDay = expectedDay % 7
    
    console.log(expectedDay)
    return doomDays[expectedDay].name
}

export function isLeapYear(year: number) {
    return new Date(year, 1, 29).getDate() === 29
}


// ref: https://stackoverflow.com/a/17743990
export function getLocaleDateString(): string {
    const formats = {
        "af-ZA": "ccyy/MM/dd",
        "am-ET": "dd/MM/ccyy",
        "ar-AE": "dd/MM/ccyy",
        "ar-BH": "dd/MM/ccyy",
        "ar-DZ": "dd-MM-ccyy",
        "ar-EG": "dd/MM/ccyy",
        "ar-IQ": "dd/MM/ccyy",
        "ar-JO": "dd/MM/ccyy",
        "ar-KW": "dd/MM/ccyy",
        "ar-LB": "dd/MM/ccyy",
        "ar-LY": "dd/MM/ccyy",
        "ar-MA": "dd-MM-ccyy",
        "ar-OM": "dd/MM/ccyy",
        "ar-QA": "dd/MM/ccyy",
        "ar-SA": "dd/MM/yy",
        "ar-SY": "dd/MM/ccyy",
        "ar-TN": "dd-MM-ccyy",
        "ar-YE": "dd/MM/ccyy",
        "arn-CL": "dd-MM-ccyy",
        "as-IN": "dd-MM-ccyy",
        "az-Cyrl-AZ": "dd.MM.ccyy",
        "az-Latn-AZ": "dd.MM.ccyy",
        "ba-RU": "dd.MM.yy",
        "be-BY": "dd.MM.ccyy",
        "bg-BG": "dd.MM.ccyy",
        "bn-BD": "dd-MM-yy",
        "bn-IN": "dd-MM-yy",
        "bo-CN": "ccyy/MM/dd",
        "br-FR": "dd/MM/ccyy",
        "bs-Cyrl-BA": "dd.MM.ccyy",
        "bs-Latn-BA": "dd.MM.ccyy",
        "ca-ES": "dd/MM/ccyy",
        "co-FR": "dd/MM/ccyy",
        "cs-CZ": "dd.MM.ccyy",
        "cy-GB": "dd/MM/ccyy",
        "da-DK": "dd-MM-ccyy",
        "de-AT": "dd.MM.ccyy",
        "de-CH": "dd.MM.ccyy",
        "de-DE": "dd.MM.ccyy",
        "de-LI": "dd.MM.ccyy",
        "de-LU": "dd.MM.ccyy",
        "dsb-DE": "dd. MM. ccyy",
        "dv-MV": "dd/MM/yy",
        "el-GR": "dd/MM/ccyy",
        "en-029": "MM/dd/ccyy",
        "en-AU": "dd/MM/ccyy",
        "en-BZ": "dd/MM/ccyy",
        "en-CA": "dd/MM/ccyy",
        "en-GB": "dd/MM/ccyy",
        "en-IE": "dd/MM/ccyy",
        "en-IN": "dd-MM-ccyy",
        "en-JM": "dd/MM/ccyy",
        "en-MY": "dd/MM/ccyy",
        "en-NZ": "dd/MM/ccyy",
        "en-PH": "MM/dd/ccyy",
        "en-SG": "dd/MM/ccyy",
        "en-TT": "dd/MM/ccyy",
        "en-US": "MM/dd/ccyy",
        "en-ZA": "ccyy/MM/dd",
        "en-ZW": "MM/dd/ccyy",
        "es-AR": "dd/MM/ccyy",
        "es-BO": "dd/MM/ccyy",
        "es-CL": "dd-MM-ccyy",
        "es-CO": "dd/MM/ccyy",
        "es-CR": "dd/MM/ccyy",
        "es-DO": "dd/MM/ccyy",
        "es-EC": "dd/MM/ccyy",
        "es-ES": "dd/MM/ccyy",
        "es-GT": "dd/MM/ccyy",
        "es-HN": "dd/MM/ccyy",
        "es-MX": "dd/MM/ccyy",
        "es-NI": "dd/MM/ccyy",
        "es-PA": "MM/dd/ccyy",
        "es-PE": "dd/MM/ccyy",
        "es-PR": "dd/MM/ccyy",
        "es-PY": "dd/MM/ccyy",
        "es-SV": "dd/MM/ccyy",
        "es-US": "MM/dd/ccyy",
        "es-UY": "dd/MM/ccyy",
        "es-VE": "dd/MM/ccyy",
        "et-EE": "dd.MM.ccyy",
        "eu-ES": "ccyy/MM/dd",
        "fa-IR": "MM/dd/ccyy",
        "fi-FI": "dd.MM.ccyy",
        "fil-PH": "MM/dd/ccyy",
        "fo-FO": "dd-MM-ccyy",
        "fr-BE": "dd/MM/ccyy",
        "fr-CA": "ccyy-MM-dd",
        "fr-CH": "dd.MM.ccyy",
        "fr-FR": "dd/MM/ccyy",
        "fr-LU": "dd/MM/ccyy",
        "fr-MC": "dd/MM/ccyy",
        "fy-NL": "dd-MM-ccyy",
        "ga-IE": "dd/MM/ccyy",
        "gd-GB": "dd/MM/ccyy",
        "gl-ES": "dd/MM/yy",
        "gsw-FR": "dd/MM/ccyy",
        "gu-IN": "dd-MM-yy",
        "ha-Latn-NG": "dd/MM/ccyy",
        "he-IL": "dd/MM/ccyy",
        "hi-IN": "dd-MM-ccyy",
        "hr-BA": "dd.MM.ccyy.",
        "hr-HR": "dd.MM.ccyy",
        "hsb-DE": "dd. MM. ccyy",
        "hu-HU": "ccyy. MM. dd.",
        "hy-AM": "dd.MM.ccyy",
        "id-ID": "dd/MM/ccyy",
        "ig-NG": "dd/MM/ccyy",
        "ii-CN": "ccyy/MM/dd",
        "is-IS": "dd.MM.ccyy",
        "it-CH": "dd.MM.ccyy",
        "it-IT": "dd/MM/ccyy",
        "iu-Cans-CA": "dd/MM/ccyy",
        "iu-Latn-CA": "dd/MM/ccyy",
        "ja-JP": "ccyy/MM/dd",
        "ka-GE": "dd.MM.ccyy",
        "kk-KZ": "dd.MM.ccyy",
        "kl-GL": "dd-MM-ccyy",
        "km-KH": "ccyy-MM-dd",
        "kn-IN": "dd-MM-yy",
        "ko-KR": "ccyy-MM-dd",
        "kok-IN": "dd-MM-ccyy",
        "ky-KG": "dd.MM.yy",
        "lb-LU": "dd/MM/ccyy",
        "lo-LA": "dd/MM/ccyy",
        "lt-LT": "ccyy.MM.dd",
        "lv-LV": "ccyy.MM.dd.",
        "mi-NZ": "dd/MM/ccyy",
        "mk-MK": "dd.MM.ccyy",
        "ml-IN": "dd-MM-yy",
        "mn-MN": "yy.MM.dd",
        "mn-Mong-CN": "ccyy/MM/dd",
        "moh-CA": "MM/dd/ccyy",
        "mr-IN": "dd-MM-ccyy",
        "ms-BN": "dd/MM/ccyy",
        "ms-MY": "dd/MM/ccyy",
        "mt-MT": "dd/MM/ccyy",
        "nb-NO": "dd.MM.ccyy",
        "ne-NP": "MM/dd/ccyy",
        "nl-BE": "dd/MM/ccyy",
        "nl-NL": "dd-MM-ccyy",
        "nn-NO": "dd.MM.ccyy",
        "nso-ZA": "ccyy/MM/dd",
        "oc-FR": "dd/MM/ccyy",
        "or-IN": "dd-MM-yy",
        "pa-IN": "dd-MM-yy",
        "pl-PL": "ccyy-MM-dd",
        "prs-AF": "dd/MM/yy",
        "ps-AF": "dd/MM/yy",
        "pt-BR": "dd/MM/ccyy",
        "pt-PT": "dd-MM-ccyy",
        "qut-GT": "dd/MM/ccyy",
        "quz-BO": "dd/MM/ccyy",
        "quz-EC": "dd/MM/ccyy",
        "quz-PE": "dd/MM/ccyy",
        "rm-CH": "dd/MM/ccyy",
        "ro-RO": "dd.MM.ccyy",
        "ru-RU": "dd.MM.ccyy",
        "rw-RW": "MM/dd/ccyy",
        "sa-IN": "dd-MM-ccyy",
        "sah-RU": "MM.dd.ccyy",
        "se-FI": "dd.MM.ccyy",
        "se-NO": "dd.MM.ccyy",
        "se-SE": "ccyy-MM-dd",
        "si-LK": "ccyy-MM-dd",
        "sk-SK": "dd. MM. ccyy",
        "sl-SI": "dd.MM.ccyy",
        "sma-NO": "dd.MM.ccyy",
        "sma-SE": "ccyy-MM-dd",
        "smj-NO": "dd.MM.ccyy",
        "smj-SE": "ccyy-MM-dd",
        "smn-FI": "dd.MM.ccyy",
        "sms-FI": "dd.MM.ccyy",
        "sq-AL": "ccyy-MM-dd",
        "sr-Cyrl-BA": "dd.MM.ccyy",
        "sr-Cyrl-CS": "dd.MM.ccyy",
        "sr-Cyrl-ME": "dd.MM.ccyy",
        "sr-Cyrl-RS": "dd.MM.ccyy",
        "sr-Latn-BA": "dd.MM.ccyy",
        "sr-Latn-CS": "dd.MM.ccyy",
        "sr-Latn-ME": "dd.MM.ccyy",
        "sr-Latn-RS": "dd.MM.ccyy",
        "sv-FI": "dd.MM.ccyy",
        "sv-SE": "ccyy-MM-dd",
        "sw-KE": "MM/dd/ccyy",
        "syr-SY": "dd/MM/ccyy",
        "ta-IN": "dd-MM-ccyy",
        "te-IN": "dd-MM-yy",
        "tg-Cyrl-TJ": "dd.MM.yy",
        "th-TH": "dd/MM/ccyy",
        "tk-TM": "dd.MM.yy",
        "tn-ZA": "ccyy/MM/dd",
        "tr-TR": "dd.MM.ccyy",
        "tt-RU": "dd.MM.ccyy",
        "tzm-Latn-DZ": "dd-MM-ccyy",
        "ug-CN": "ccyy-MM-dd",
        "uk-UA": "dd.MM.ccyy",
        "ur-PK": "dd/MM/ccyy",
        "uz-Cyrl-UZ": "dd.MM.ccyy",
        "uz-Latn-UZ": "dd/MM ccyy",
        "vi-VN": "dd/MM/ccyy",
        "wo-SN": "dd/MM/ccyy",
        "xh-ZA": "ccyy/MM/dd",
        "yo-NG": "dd/MM/ccyy",
        "zh-CN": "ccyy/MM/dd",
        "zh-HK": "dd/MM/ccyy",
        "zh-MO": "dd/MM/ccyy",
        "zh-SG": "dd/MM/ccyy",
        "zh-TW": "ccyy/MM/dd",
        "zu-ZA": "ccyy/MM/dd",
    }

    return formats[navigator.language] || 'dd/MM/ccyy';

} 