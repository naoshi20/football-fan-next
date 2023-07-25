import Image from 'next/image'
import StarButton from '../star-button/star-button.component'
import scoped from './card.module.scss'
import Link from 'next/link'

export default function Card({
  id,
  img,
  japanese_name,
  belongings,
  favorite,
  clickCallBack
}) {
  return (
    <Link href={`/players/${id}`} key={id} className="col-md-3 col-sm-4 col-6">
      <div className={`card ${scoped.card}`}>
        <StarButton
          playerId={id}
          clickCallBack={clickCallBack}
          favorite={favorite}
        ></StarButton>
        <>
          {img ? (
            <Image
              src={img}
              width={500}
              height={500}
              alt="Picture of the player"
              quality={90}
              priority={false}
              className={scoped.cardImgTop}
            />
          ) : (
            <Image
              src="/images/sample-person.jpg"
              width={500}
              height={500}
              alt="Picture of the player"
              quality={100}
              priority={false}
              className={scoped.cardImgTop}
            />
          )}
        </>
        <div className="card-body">
          <p>{belongings}</p>
          <h5>{japanese_name}</h5>
        </div>
      </div>
    </Link>
  )
}
