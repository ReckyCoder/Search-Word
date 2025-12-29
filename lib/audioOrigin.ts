export const returnAudioTextForNative = (audio : string | undefined) => {
    if(audio?.includes('au')) return '(AU)'
    else if (audio?.includes('uk')) return '(UK)'
    else if (audio?.includes('us')) return '(US)'
}