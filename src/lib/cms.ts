import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const _reader = createReader(process.cwd(), keystaticConfig);

export function getHomePage() {
  return _reader.singletons.homePage.read();
}

export function getAboutMe() {
  return _reader.singletons.aboutMe.read();
}

export function getFaq() {
  return _reader.singletons.faq.read();
}

export function getContact() {
  return _reader.singletons.contact.read();
}

export function getTestimonials() {
  return _reader.singletons.testimonials.read();
}
