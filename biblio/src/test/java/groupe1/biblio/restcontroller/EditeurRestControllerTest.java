package groupe1.biblio.restcontroller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import groupe1.biblio.dao.IDAOEditeur;


@WebMvcTest(controllers = EditeurRestController.class)
public class EditeurRestControllerTest {

    @Autowired 
    private MockMvc mockMvc;

    @MockitoBean 
    private IDAOEditeur daoEditeur;

    @Test 
    @WithMockUser 
    void shouldFindAllStatusOk() throws Exception {

        String url = "/api/editeur"; 

        ResultActions result = this.mockMvc.perform(
            MockMvcRequestBuilders.get(url)
        );

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$").exists());

        Mockito.verify(this.daoEditeur).findAll();

    }

    @Test
    @WithMockUser 
    void shouldCreateStatusOk() throws Exception{

        String url = "/api/editeur"; 

         ResultActions result = this.mockMvc.perform(
            MockMvcRequestBuilders
                .post(url)
                .content("""
                    {
                        "nom": "TEST DE CREATION",
                        "pays": "TEST"
                    }
                """)
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf())
        );

        // then
        result.andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(this.daoEditeur).save(Mockito.any()); // On vérifie si save a été appelée
    }

   @Test 
   @WithMockUser 
   void shouldDeleteByIdStatusOk() throws Exception {

    int id = 1;
    String url = "/api/editeur/"+ id; 

    ResultActions result = this.mockMvc.perform(MockMvcRequestBuilders.delete(url).with(SecurityMockMvcRequestPostProcessors.csrf()));

    result.andExpect(MockMvcResultMatchers.status().isOk());
    Mockito.verify(this.daoEditeur).deleteById(id);
   }

}
