import Image from 'next/image'
import StarButton from '../star-button/star-button.component'
import scoped from './card.module.scss'

export default function card({ id, img, japanese_name, belongings }) {
  return (
    <div key={id} className="col-md-3 col-sm-4 col-6">
      <a>
        <div className={`card ${scoped.card}`}>
          <StarButton></StarButton>
          <>
            {img ? (
              <Image
                src={img}
                width={500}
                height={500}
                alt="Picture of the player"
                quality={100}
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
            <p>{japanese_name}</p>
            <h5>{belongings}</h5>
          </div>
        </div>
      </a>
    </div>
  )
}
