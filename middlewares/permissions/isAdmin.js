import { rolesEnum } from '../../utils/enums/roles.js'

async function isAdmin(req, res, next) {
  if (req.user.role !== rolesEnum.ADMIN) {
    res.json({
      status: 403,
      message: 'You are not authorized to perform this action',
    })
  }

  next()
}

export { isAdmin }
