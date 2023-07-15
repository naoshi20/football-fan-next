export default function PropertyRow({ k, v }) {
  return (
    <li
      className="w-full flex justify-between py-2"
      style={{ textAlign: 'center' }}
    >
      <p className="w-1/2">{k}</p>
      <p className="w-1/2">{v}</p>
    </li>
  )
}
