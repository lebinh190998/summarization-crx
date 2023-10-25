import classNames from 'classnames';
import React, { memo, useEffect, useState } from 'react';
import './TextContainer.scss'

interface TextContainerType {
    childElements: any[] | null,
    className?: string;
}

const TextContainer = ({
    childElements = [],
    className = ''
}: TextContainerType) => {
    return (
        <div className={classNames('dodoTextContainer', className)}>
            {childElements?.map((element, index) => {
                return (
                    <div key={String(index)}>
                        {element}
                    </div>
                )
            })}
        </div>
    )
}


export default memo(TextContainer);