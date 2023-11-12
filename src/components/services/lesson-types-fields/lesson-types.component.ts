export const rules = {
  required: (value : string) => !!value || 'Champs requis',
  formatStringNumber: (value : string) => {
    const regex = /^\d+$/;
    return regex.test(value) || 'Un chiffre/nombre entier est attendu'
  }
}