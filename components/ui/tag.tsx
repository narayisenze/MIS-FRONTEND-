import { forwardRef } from 'react'
import { cn } from "@/lib/utils";
import type { ReactNode } from 'react'
import { CommonProps } from '@/lib/type';

export interface TagProps extends CommonProps {
    children: ReactNode
    prefix?: boolean | ReactNode
    prefixClass?: string
    suffix?: boolean | ReactNode
    suffixClass?: string
}

const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
    const {
        className,
        children,
        prefix,
        suffix,
        prefixClass,
        suffixClass,
        ...rest
    } = props

    return (
        <div ref={ref} className={cn('tag', className)} {...rest}>
            {prefix && typeof prefix === 'boolean' && (
                <span
                    className={cn('tag-affix tag-prefix', prefixClass)}
                />
            )}
            {typeof prefix === 'object' && prefix}
            {children}
            {suffix && typeof suffix === 'boolean' && (
                <span
                    className={cn('tag-affix tag-suffix', suffixClass)}
                />
            )}
            {typeof suffix === 'object' && suffix}
        </div>
    )
})

Tag.displayName = 'Tag'

export default Tag
