import React, { FC } from 'react'
import { Img } from 'react-image'
import { Skeleton } from 'antd'

type Props = {
  src?: string
  title: string
  onClick?: () => void
}

const ProductImage: FC<Props> = ({ src, onClick, title }) => {
  return (
    <div
      className="pointer"
      key={src}
      onClick={() => onClick?.()}
      onKeyPress={() => onClick?.()}
      role="button"
      tabIndex={0}
    >
      <Img
        loader={<Skeleton.Image />}
        src={
          src ??
          'https://www.bauducco.com.br/wp-content/uploads/2017/09/default-placeholder-1-2.png'
        }
        alt={title}
        title={title}
        className="br3 shadow-1"
      />
    </div>
  )
}

export default ProductImage
