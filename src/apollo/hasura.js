import React from 'react'


import { gql } from '@apollo/client'


export const GET_USER_DETAILS = gql`
    query GetDetails($user_id: uuid!) {
        user(id: $user_id) {
          email
          defaultRole
          user_detail {
            branch
            date_of_birth
            details_id
            father_name
            first_name
            last_name
            mentor_email
            mentor_name
            mobile
            roll_num
            section
            semester
            user_id
          }
        }
      }
 `; 

//  export const INSERT_LECTURE_URL = gql`
//       mutation InsertLectureUrl
//  `;

 