export const getFixedData = () => {
  const payments = [
    { value: 'DINHEIRO', label: 'Dinheiro' },
    { value: 'CREDITO', label: 'Crédito' },
    { value: 'DEBITO', label: 'Débito' },
    { value: 'PIX', label: 'Pix' },
  ]

  const priorities = [
    { value: 'ALTA', label: 'Alta' },
    { value: 'MEDIA', label: 'Média' },
    { value: 'BAIXA', label: 'Baixa' },
  ]

  const clients = [
    { label: 'Juliano Santos', value: '740ea0fe-5db2-4e43-b4c5-d5a878a3fe66' },
    { label: 'Amanda Oliveira', value: 'f46bfc07-0c1b-4676-8100-8d8b79f24ab6' },
  ]

  return { payments, priorities, clients }
}
