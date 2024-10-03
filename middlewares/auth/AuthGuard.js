import { authService } from '../../services/auth.service.js'
import { handleError } from '../../helpers/handleError.js'
import UnauthorizedException from '../../exceptions/UnauthorizedException.js'

/**
 * Check if the request has a valid token
 * and set the user in the request object
 *
 *
 */

async function authGuard(req, res, next) {
    try {
        if (!req.headers['authorization']) {
            throw new UnauthorizedException('No token provided')
        }

        const token = req.headers['authorization'].split(' ')[1]

        req.user = await authService.verifyToken(token)

        console.log(req.user)

        next()
    } catch (error) {
        handleError(res, error)
    }
}

export { authGuard }
