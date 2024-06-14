export function sortFrequency(a: Goal, b: Goal) {
  switch (a.frequency) {
    case 'daily': {
      if (b.frequency === 'daily') return 0
      if (b.recurring) return -1

      return 1
    }
    case 'weekly': {
      if (b.frequency === 'weekly') return 0
      if (b.recurring) {
        if (b.frequency === 'daily') return 1

        return -1
      }

      return 1
    }
    case 'monthly': {
      if (b.frequency === 'monthly') return 0
      if (b.recurring) {
        if (['daily', 'weekly'].includes(b.frequency)) return 1

        return -1
      }

      return 1
    }
    case 'yearly': {
      if (b.frequency === 'yearly') return 0
      if (b.recurring) {
        if (['daily', 'weekly', 'monthly'].includes(b.frequency)) return 1

        return -1
      }

      return 1
    }
    default: {
      return 0
    }
  }
}
