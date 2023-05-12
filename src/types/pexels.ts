export type PexelsPhoto = {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    photographer_url: string
    photographer_id: number
    avg_color: HexColor
    src: PexelsSource
    liked: boolean
    alt: string
}

export type PexelsSource = {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
}

export type HexColor = `#${string}`

export enum PexelsOrientation {
    'all' = '',
    'landscape' = 'landscape',
    'portrait' = 'portrait',
    'square' = 'square',
}

export enum PexelsSize {
    'all' = '',
    'large (24MP)' = 'large',
    'medium (12MP)' = 'medium',
    'small (4MP)' = 'small',
}

export enum PexelsColor {
    'all' = '',
    'red' = 'red',
    'orange' = 'orange',
    'yellow' = 'yellow',
    'green' = 'green',
    'turquoise' = 'turquoise',
    'blue' = 'blue',
    'violet' = 'violet',
    'pink' = 'pink',
    'brown' = 'brown',
    'black' = 'black',
    'gray' = 'gray',
    'white' = 'white',
}

export enum PexelsLocale {
    'all' = '',
    'english' = 'en-US',
    'portuguese' = 'pt-BR',
    'spanish' = 'es-ES',
    'catalan' = 'ca-ES',
    'german' = 'de-DE',
    'italian' = 'it-IT',
    'french' = 'fr-FR',
    'swedish' = 'sv-SE',
    'indonesian' = 'id-ID',
    'polish' = 'pl-PL',
    'japanese' = 'ja-JP',
    'traditional-chinese' = 'zh-TW',
    'simplified-chinese' = 'zh-CN',
    'korean' = 'ko-KR',
    'thai' = 'th-TH',
    'dutch' = 'nl-NL',
    'hungarian' = 'hu-HU',
    'vietnamese' = 'vi-VN',
    'czech' = 'cs-CZ',
    'danish' = 'da-DK',
    'finnish' = 'fi-FI',
    'ukrainian' = 'uk-UA',
    'greek' = 'el-GR',
    'romanian' = 'ro-RO',
    'norwegian' = 'nb-NO',
    'slovak' = 'sk-SK',
    'turkish' = 'tr-TR',
    'russian' = 'ru-RU',
}

export type PexelsSearchParameters = {
    query?: string
    orientation?: PexelsOrientation
    size?: PexelsSize
    color?: PexelsColor
    locale?: PexelsLocale
    page?: number
    per_page?: PexelsPerPage
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type PexelsPerPage = IntRange<15, 81>

export type PexelsSearchResponse = {
    total_results: number
    page: number
    per_page: PexelsPerPage
    photos: PexelsPhoto[]
    next_page?: string
    prev_page?: string
}
