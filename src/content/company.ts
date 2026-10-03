import { CONTACT_MAIL } from '../config';

/** Firmendaten fuer Impressum und Datenschutz. Leer = im Text erscheint ein
 *  markierter Platzhalter (Musterfirma ...); leere UID = die Zeile entfaellt. */
export const COMPANY = {
  name: '',
  person: 'ADO',
  street: '',
  zipCity: '',
  uid: '',
  email: CONTACT_MAIL,
};
