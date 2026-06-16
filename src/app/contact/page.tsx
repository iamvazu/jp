import React from 'react';
import ContactClient from '../../components/ContactClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote — Custom PTFE Wire & Cable | Jain Polymer Co., Rohtak',
  description: 'Submit your technical specifications or design blueprints to Jain Polymer Co. for high-temperature PTFE/Teflon wires, FEP cables, and sleevings.',
};

export default function ContactPage() {
  return <ContactClient />;
}
