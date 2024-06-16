import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'

interface StyledLoadingButtonProps extends LoadingButtonProps {
  //
}

export default function StyledLoadingButton({
  children,
  ...props
}: StyledLoadingButtonProps) {
  return (
    <LoadingButton
      variant="contained"
      {...props}
      sx={{
        textTransform: 'none',
        ...(props.variant === 'text' ? { px: 0 } : {}),
        ...props.sx,
      }}
    >
      {children}
    </LoadingButton>
  )
}
