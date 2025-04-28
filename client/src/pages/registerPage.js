import React, { useState } from 'react';
import api from '../service/api';

function registerPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });
