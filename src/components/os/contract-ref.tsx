/** Referencia de contrato enmascarada, legible para lectores de pantalla. */
export function ContractRef({ value }: { value: string }) {
  const digits = value.replace(/^•+/, '');
  return (
    <>
      <span aria-hidden="true">{value}</span>
      <span className="sr-only">terminación {digits}</span>
    </>
  );
}
