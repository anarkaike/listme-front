import { HumanizeDurationLanguage, HumanizeDuration } from 'humanize-duration-ts'
import { date } from 'quasar'

export default function useHumanize () {
  const langService: HumanizeDurationLanguage = new HumanizeDurationLanguage()
  const humanizer: HumanizeDuration = new HumanizeDuration(langService)

  const humanizeDuration = (milliseconds: number) => {
    const durationHumanized = humanizer.humanize(milliseconds, {
      language: 'pt',
      units: ['y', 'mo', 'w', 'd', 'h', 'm'],
      round: true
    })

    return durationHumanized.replace(/,\s*([^,]*)$/, ' e $1')
  }

  const humanizeDatetime = (datetime: string, format = 'DD/MM HHhmm') => {
    let dateHumanized = ''

    const yearOfDatetime = date.formatDate(datetime, 'YY')
    const yearOfNow = date.formatDate(new Date(), 'YY')

    if (format === 'DD/MM HHhmm') {
      format = yearOfDatetime === yearOfNow ? 'DD/MM HH' : 'DD/MM/YY HH'
      dateHumanized = date.formatDate(datetime, format) + 'h' + date.formatDate(datetime, 'mm')
      const sufix = yearOfDatetime === yearOfNow ? '' : '/'
      dateHumanized = dateHumanized
        .replace('/01' + sufix, '/jan' + sufix)
        .replace('/02' + sufix, '/fev' + sufix)
        .replace('/03' + sufix, '/mar' + sufix)
        .replace('/04' + sufix, '/mai' + sufix)
        .replace('/05' + sufix, '/abr' + sufix)
        .replace('/06' + sufix, '/jun' + sufix)
        .replace('/07' + sufix, '/jul' + sufix)
        .replace('/08' + sufix, '/ago' + sufix)
        .replace('/09' + sufix, '/set' + sufix)
        .replace('/10' + sufix, '/out' + sufix)
        .replace('/11' + sufix, '/nov' + sufix)
        .replace('/12' + sufix, '/dez' + sufix)

        .replace(' ', ' às ')
    } else {
      dateHumanized = date.formatDate(datetime, format)
    }

    return dateHumanized.replace('h00', 'h').replace(':00', 'h')
  }

  return {
    humanizeDuration,
    humanizeDatetime
  }
}
