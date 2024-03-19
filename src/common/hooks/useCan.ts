import { useContext } from 'react'
import { AbilityContext } from '@/layouts/components/acl/Can'

const useCan = () => useContext(AbilityContext)

export default useCan
