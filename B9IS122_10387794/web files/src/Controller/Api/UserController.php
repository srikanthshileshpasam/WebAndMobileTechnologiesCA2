<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/api/user/register", name="api_user_register")
     */
    public function index(Request $request)
    {
        $data =  $request->request->all();
        $check = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($check) {
            return ['status' => 'error', 'msg' => 'This email already registered'];
        } else {
            $user = New User();
            $user->setName($data['name']);
            $user->setEmail($data['email']);
            $user->setPassword(md5($data['password']));
            $user->setLocation($data['location']);
            $user->setPhone($data['phone']);
            $user->setRole('User');
            $user->setPic('uploads/avatar.png');
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            return ['status' => 'success', 'msg' => 'User registered'];
        }
//        return ($this->getDoctrine()->getRepository(User::class)->findOneBy(['password' => md5($data['password'])]));
        $user->set($data['']);
        return $this->render('api/user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    /**
     * @Route("/api/user/login", name="api_user_login")
     */

    public function userLogin(Request $request) {
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $request->get('email'), 'password' => md5($request->get('password'))]);
        if ($user) {
            return ['status' => 'success', 'user' => $user];
        } else {
            ['status' => 'error', 'msg' => 'Kindly check email or password and try again!'];
        }
    }


    /**
     * @Route("/api/user/pic/update", name="api_user_pic_update")
     */

    public function picUpdate(Request $request){
        $date = date('mdYhisms', time());
        $filename = $date.'.jpeg';
        $filepath = "uploads/".$filename;
//        $file2 = $base64_string($base64_string,$filepath);
        file_put_contents($filepath, file_get_contents($request->get('pic')));
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($request->get('id'));
        $user->setPic($filepath);
        $em->flush();
        return 'success';
    }
    /**
     * @Route("/api/user/update", name="api_user_update")
     */

    public function userUpdate(Request $request) {
        $data =  $request->request->all();
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($data['id']);
        $check = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        function updateUserCheck($check,$id) {
            if ($check){
                if ($check->getId() == $id){
                    return false;
                } else return true;
            } return false;
        }
        if (updateUserCheck($check,$data['id'])) {
            return ['status' => 'error', 'msg' => 'This email already registered to another user'];
        } else {
            $user->setName($data['name']);
            $user->setEmail($data['email']);
            $user->setLocation($data['location']);
            $user->setPhone($data['phone']);
            $em = $this->getDoctrine()->getManager();
            $em->flush();
            return ['status' => 'success', 'msg' => 'User updated', 'user' => $user];
        }
//        return ($this->getDoctrine()->getRepository(User::class)->findOneBy(['password' => md5($data['password'])]));
        $user->set($data['']);
        return $this->render('api/user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }
}
